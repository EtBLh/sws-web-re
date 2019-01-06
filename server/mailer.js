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
        service: 'gmail',
        auth: {
            user:  'username@example.com',
            pass:  'password',
        }
    };
    // merge options
    let opt = mergeConfig(options);
    
    return nodemailer.createTransport(opt);
}

function Validater(options, log) {
    /**
     * @description a mailer constructor
     * @param {Object} contains two object: transporterOptions,\
     *  mailOptions. 
     * @param {Object} callback function of send and save
     * 
     */
    
    // validate options, username and password shoud be included
    if (!options.transporter.auth) throw "username and password shoud be included in options, function createMailer";
    
    // set properties
    this.transporter = createTransporter(options.transporter);
    this.BasicMailOption = options.mail;
    this.log = mergeConfig({
        send: function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        },
        save: function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log('Save map...done');
            }
        }
    }, log);
    this.content;
    this.map = {uuid:{}, mail:{}};
    this.mapFilename = 'map.json';
    
    // render methods
    this.getMailOptions = opt => mergeConfig(opt, this.BasicMailOption);
    this.renderContent;

    // send mail
    this.send = content => {
        let mailOptions = getMailOptions();
        mailOptions.html = content;
        this.transporter.sendMail(mailOptions, this.log.send);
    };

    // read map from file
    this.readMap = function (filename=this.mapFilename) {
        let fileContent;
        fs.readFileSync(filename, function (error, data) {
            if (error) {
                console.log(error);
            } else {
                fileContent = JSON.parse(data.toString());
            }
        });
        fileContent = mergeConfig(fileContent.mail, map.mail);
        fileContent = mergeConfig(fileContent.uuid, map.uuid); 
        return fileContent;
    };

    // save map to file
    this.save = async function (filename=this.mapFilename) {
        let fileContent;
        await fs.readFile(filename, function (error, data) {
            if (error) {
                console.log(error);
            } else {
                fileContent = JSON.parse(data.toString());
            }
        });
        fileContent = mergeConfig(fileContent.mail, map.mail);
        fileContent = mergeConfig(fileContent.uuid, map.uuid); 
        
        fs.writeFile(filename, fileContent, this.log.save);
    };

    // clear map
    this.clearMap = function () { this.map = {uuid:{}, mail:{}}; };

    this.isValid = function (email, type='mail') {
        if (this.map.[type][email]) {
            return this.map[type][email];
        } else {
            let fileContent =  this.readMap();
            return fileContent[type][email] ? fileContent[type][email] : null;
            // this.clearMap();
        }
    };
    
    // mark email/someone as checked
    this.mark = function (email) {
        if (error) { console.log(error); }
        // mark email as true
        // and remove uuid
        let item = this.map.mail[email];
        if (item) {
            delete this.map.uuid[item];
            this.map.mail[email] = true;
        } else {
            let fileContent = this.readMap();
            fileContent = this.readMap();
            item = fileContent.mail[email];
            if (!item) return;
            delete fileContent.uuid[item];
            fileContent.mail[email] = true;
            fs.writeFile(this.mapFilename, fileContent, function (error) {
                if (error) {
                    console.log(error);
                }
            }
        }
    };

    this.add = function (email) {
        // if (this.find(email)) console.log(`Email ${email} is already existed`);
        let uid = uuid();
        this.map.uuid[email] = uid;
        this.map.mail[uid] = email;
        this.send(email);
    };
}

module.exports = {
    Validater: Validater
}
