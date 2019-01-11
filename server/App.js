/**
 * A normal express app
 */

const express = require('express');
const path = require('path');
const { Validater } = require('./mailer')
const secret = require('./secret')
const readline = require('readline');

//----------------------express app config----------------------

const app = express()


let pollStatus = false;
let val = new Validater(secret)

app.use(express.json());

app.use(express.static(path.resolve('../client/build')));

app.post('/api/poll', (req, res)=> {
    if (!pollStatus) return;

    let body = req.body;
    res.json({status: "success",email: body.email, object: body.object})

    val.add(body.email)
    // console.log(val.isVerify(body.email));

    console.log(`A poll request was posted, email: ${body.email}, object: ${body.object}`)
})

app.get('/api/voteCheck', (req, res)=>{
});

app.get('/api/pollStatus', (req, res)=>{
    res.json({status: pollStatus});
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.resolve('../client/build/index.html/'));
});

//----------------------app start----------------------

const port = process.env.PORT || 80;
app.listen(port);

console.log('Express app is listening on '+ port);

const cmdHandler = {
    'poll': function(cmd){
        if (cmd[1] == 'activate') {
            pollStatus = true;
            console.log('pollStatus is now activated')
        }
        else if (cmd[1] == 'deactivate') {
            pollStatus = false; 
            console.log('pollStatus is now deactivated')
        } else {
            console.log('input is undefined')
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
    try{
        cmdHandler[cmd[0]](cmd);
    } catch{
        console.log('input is undefined')
    }
});
