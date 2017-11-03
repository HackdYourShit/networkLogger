// server.js
const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');

const app = express();
const port = 1024;

//Rouetes
app.use(bodyParser.json());
app.use(require('./routes/api'));


app.listen(port, function(){

  console.log("Server Started at "+port+"...");
});
