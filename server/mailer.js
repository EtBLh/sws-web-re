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
    <div style='
        margin: 0 auto;
        display: inline-block;
        background-color: #EEE;
        border: solid 2px #EAEAEA;
        border-radius: 10px;
        padding: 1rem;
    '>
        <h1>
            Sing With Soul
        </h1>
        <p>
            This mail was sent from sws.spssa.ml for poll verification,<br/>
            click the button below to finish verification.
        </p>    


        <a href="sws.spssa.ml/verify/{0}"
           style='
           display: block;
           width: 150px;
           height: 30px;
           color: white;
           margin: 0 auto;
           border-radius: 5px;
           text-align: center;
           text-decoration: none;
           background-color: #894EE8;
           '
        >Click me to Verify</a><br/><br/>
        From SPSSA

        <p style="color: darkgray">if you didn't poll, please ignore this email.</p>
    </div>
   `;
    this.basicSetting = {
        user: auth.user,
        subject: "Verification Email"
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
               }
           }
       });
    };

    this.add = function (email, ctx=[], send=true) {
        let id = uuid();
        ctx.splice(0,0,id);
        // add Record to map
        this.map.uuid[id] = email;
        if (this.map.email[email] === undefined) {
            this.map.email[email] = false;
        }
        if (send) {
            this.send(ctx, email);
        }
    }

    this.mark = function (email) {
        this.map.email[email] = true;
    }

    this.valid = function (id, deleteRecord=true) {
        let email = this.map.uuid[id]
        if (email) {
            if (deleteRecord) {
                this.mark(this.map.uuid[id]);
                delete this.map.uuid[id]
            }
            return email;
        } else {
            return false;
        }
    }

    this.isVerify = email => this.map.email[email];
}

module.exports = {
    Validater: Validater
}
