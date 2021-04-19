var path = require('path')
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
var aylien = require("aylien_textapi");

const dotenv = require('dotenv');
dotenv.config();

let projectData = {};

var textApi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post("/api", (req, res) => {
  const text = req.body;
  console.log("Request to '/api' endpoint", text);
  textApi.sentiment(text, (error, result, remaining) => {
    if(error) console.log(error);
    console.log("Aylien Callback Response and Remaining requests available", result, remaining);
    res.send(result);
  });
});

const port = 8000;

app.listen(port, function () {
    console.log(`Evalute NLP app's server listening on port ${port}!`);
});