const express = require('express');
const app =express();
const path = require('path');
const server = require('http').Server(app);
const cors = require('cors')();
const bodyParser = require('body-parser');

const port =process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended:true
}));

app.use(cors);

app.use('/', express.static(__dirname));

app.listen(port,()=> console.log('Running on port: '+port));