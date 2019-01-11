/**
 * A normal express app
 */

const express = require('express');
const path = require('path');
const { Validater } = require('./mailer')
//place email username and password
const secret = require('./secret')
//for building CLI 
const readline = require('readline');
const pollResult = require('./pollResult')
const fs = require('fs')

//----------------------express app config----------------------

const app = express()

let pollStatus = false;
let val = new Validater(secret, true)
let favPR = new pollResult()
let tUPR = new pollResult()

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
    res.json({status: "success" ,email: body.email, favObject: body.favObject, TUObject: body.TUObject})

    val.add(body.email)
    favPR.temp[body.email] = body.favObject;
    tUPR.temp[body.email] = body.TUObject;

})

app.get('/api/pollStatus', (req, res)=>{
    res.json({status: pollStatus});
})

app.post('/api/verify/:id', (req, res) =>{
    let email = val.valid(req.params.id);
    if (email){
        res.json({status: true})
        favPR.add(favPR.temp[email]);
        tUPR.add(tUPR.temp[email]);
    } else {
        res.json({status: false})
    }
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.resolve('../client/build/index.html/'));
});

//----------------------app start----------------------

const port = process.env.PORT || 8080;
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
            console.log('--Fav--')
            favPR.show();
            console.log('--TU--')
            tUPR.show();
        } 
        else if( cmd[1] == 'export') {
            fs.writeFileSync('./result.json', JSON.stringify({fav: favPR.getResult(), TU: tUPR.getResult()}), 'utf-8');
            console.log(JSON.stringify({fav: favPR.getResult(), TU: tUPR.getResult()}))
        }
        else if( cmd[1] == 'load'){
            data = JSON.parse(fs.readFileSync('./result.json',{encoding: 'utf-8'}));
            favPR.setResult(data.fav)
            tUPR.setResult(data.TU)
        }
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
let activeRL = () => {rl.on('line', (input) => {
    if (input == "exit") {
        rl.question("Do you want to save the result? yes/no/cancel: ", 
            (ans) => {
                if (ans == 'yes'){
                    fs.writeFileSync('./result.json', JSON.stringify({fav: favPR.getResult(), TU: tUPR.getResult()}), 'utf-8');
                    console.log(JSON.stringify({fav: favPR.getResult(), TU: tUPR.getResult()})) 
                   
                    console.log('--Fav--')
                    favPR.show();
                    console.log('--TU--')
                    tUPR.show(); 

                } else if(ans == 'no'){
                    process.exit(0);
                } else if(ans == 'cancel'){}
            }
        );
        return;
    }
    try{
        let cmd = input.split(" ");
        cmdHandler[cmd[0]](cmd);
    } catch(e) {
        console.log('input is invalid.')
    }
});}


activeRL();

process.on('SIGINT', function() {
    rl.question("Caught interrupt signal, Are you sure you want to exit? yes/no: ", 
        (ans) => {
            if (ans == 'yes') process.exit(0);
            else activeRL();
        }
    );
});

