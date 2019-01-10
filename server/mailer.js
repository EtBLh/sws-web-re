/**
 * @file export a mailer
 * @author truco(tszlungchung13768@gmail.com)
 */

const nodemailer = require('nodemailer');
const uuid = require('uuid/v4');
const fs = require('fs');

function mergeConfig(defaultConfig, userConfig) {
    config = defaultConfig;
    for (let k in Object.keys(userConfig)) {
        config[k] = userConfig[k];
    }
    return config;
}

function createTransporter (options) {
    /**
     * @param {Object} options to create the transporter 
     * @return {Object} an transporter
     */

    // create options
    let defaultOptions = {
        service: 'Gmail',
        auth: {
            user:  'username@example.com',
            pass:  'password',
        }
    };
    // merge options
    let opt = mergeConfig(options);
    console.log(opt)
    
    return nodemailer.createTransport(opt);
}

function Validater(auth, silent=false) {
    /**
     * @description a mailer constructor
     * @param {Object} contains two object: transporterOptions,\
     *  mailOptions. 
     * @param {Object} callback function of send and save
     * 
     */
    
    // validate options, username and password shoud be included
    if (!auth) throw "username and password shoud be included in auth, function createMailer";
    
    // property
    this.map = {
        'uuid': {},
        'email': {}
    };
    this.template = `
    This is a mail sended from the vote website for verify you email
    Click this link to confirm <a href="{0}">{0}</a>
    
    From SP Student Union
    `;
    this.basicSetting = {
        user: auth.user,
        subject: "Verify Email"
    }

    // init
    this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: auth
    });

    this.render = function (...args) {
        let index = 0;
        let tmp = this.template;
        let pattern = '';
        for (let text of args) {
            pattern = `\\{${index}\\}`;
            tmp = this.template.replace(new RegExp(pattern, 'g'), text);
            index++
        }
        return tmp;
    }


    // send mail function
    this.send = function (content, email) {
        let mailOption = {
            from: this.basicSetting.user,
            to: email,
            subject: this.basicSetting.subject,
            html: this.render(content)
        }
       this.transporter.sendMail(mailOption, function (error, response) {
           if (!silent) {
               if (error) {
                   console.log(error);
               } else {
                   console.log(response);
               }
           }
       });
    };

    this.add = function (email, send=true) {
        let id = uuid()
        // add Record to map
        this.map.uuid[id] = email;
        if (this.map.email[email] === undefined) {
            this.map.email[email] = false;
        }
        if (send) {
            this.send(id, email);
        }
    }

    this.mark = function (email) {
        this.map.email[email] = true;
    }

    this.valid = function (email, id, deleteRecord=true) {
        if (this.map.uuid[id] === mail) {
            if (deleteRecord) {
                delete this.map.uuid[id]
            }
            this.mark(email);
            return true;
        } else {
            return false;
        }
    }

    this.isVerify = email => this.map.email[email];
}

module.exports = {
    Validater: Validater
}
