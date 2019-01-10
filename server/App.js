/**
 * A normal express app
 */

const express = require('express');
const path = require('path');

//----------------------express app config----------------------

const app = express()
app.use(express.json());

app.use(express.static(path.resolve('../client/build')));

app.get('/api/getList', (req, res)=> {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
})

app.post('/api/poll', (req, res)=> {
    let body = req.body;
    res.json({status: "success",email: body.email, object: body.object})
    // ---TODO---
    // ---Handle poll instance
    console.log(`A poll request was posted, email: ${body.email}, object: ${body.object}`)
})

app.get('/api/voteCheck', (req, res)=>{
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.resolve('../client/build/index.html/'));
});

//----------------------app start----------------------

const port = process.env.PORT || 80;
app.listen(port);

console.log('Express app is listening on '+ port);