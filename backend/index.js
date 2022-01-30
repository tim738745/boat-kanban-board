const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const config = require('./config.js');
const connectionString = config.envDBConnectionString;
const port = config.envPort;

//listen for connections
app.listen(port, () => {
    console.log('App listening');
});

//loads frontend public files into browser
app.use(express.static(path.join(__dirname, '../frontend/build')));

//open db connection
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {console.log("db connected")}
  ).catch(err => {"db connection failed: ", err});

//root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

//read incoming request json bodies into req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//boat routes
const boats = require('./api/boatRoutes.js');
app.use('/boats', boats);
