/**
 * A normal express app
 */

const express = require('express');
const path = require('path');
const { Validater } = require('./mailer')
const secret = require('./secret')
const readline = require('readline');
const pollResult = require('./pollResult')
const fs = require('fs')

//----------------------express app config----------------------

const app = express()

let pollStatus = false;
let val = new Validater(secret)
let pR = new pollResult()

app.use(express.json());

app.use(express.static(path.resolve('../client/build')));

app.post('/api/poll', (req, res) => {
    if (!pollStatus){
        return;
    } 

    let body = req.body;
    if (val.isVerify(body.email)){
        res.json({isVerified: true});
        return;
    }
    res.json({status: "success" ,email: body.email, object: body.object})

    val.add(body.email)
    pR.temp[body.email] = body.object;

    console.log(`A poll request was posted, email: ${body.email}, object: ${body.object}`)
})

app.get('/api/pollStatus', (req, res)=>{
    res.json({status: pollStatus});
})

app.post('/api/verify/:id', (req, res) =>{
    let email = val.valid(req.params.id);
    if (email){
        res.json({status: true})
        pR.add(pR.temp[email]);
    } else {
        res.json({status: false})
    }
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.resolve('../client/build/index.html/'));
});

//----------------------app start----------------------

const port = process.env.PORT || 80;
app.listen(port);

console.log('app is listening on '+ port);

const cmdHandler = {
    'poll': function(cmd){
        if (cmd[1] == 'activate') {
            pollStatus = true;
            console.log('pollStatus is now activated')
        }
        else if (cmd[1] == 'deactivate') {
            pollStatus = false; 
            console.log('pollStatus is now deactivated')
        } 
        else if (cmd[1] == 'show') {
            pR.show();
        } 
        else if( cmd[1] == 'export') {
            fs.writeFileSync('./result.json', JSON.stringify(pR.getResult()), 'utf-8')
            console.log(JSON.stringify(pR.getResult()))
        }
        else if( cmd[1] == 'load'){
            pR.setResult(JSON.parse(fs.readFileSync('./result.json',{encoding: 'utf-8'})))
        }
        else {
            console.log('_input is undefined')
        }
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
rl.on('line', (input) => {
    if (input == "exit") process.exit(0);
    let cmd = input.split(" ");
    cmdHandler[cmd[0]](cmd);
});
