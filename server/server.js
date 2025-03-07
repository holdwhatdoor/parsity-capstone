const express = require("express");
const passport = require("passport")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const jwt = require("jwt-simple");
// const cors = require("cors");
require("dotenv").config;
const test = require("dotenv").config

const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 8000;
const apiKey = process.env.FDC_USDA_API_KEY;
const ouncesPerGram = process.env.OUNCES_PER_GRAM;

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ 
  extended:false 
}))

// cors support
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(`X-Api-Key : ${apiKey}`)
  next();
});

app.use(passport.initialize());

// variable for server routes
const mainRoutes = require("./routes/main")
app.use(mainRoutes)

app.listen(SERVER_PORT, () => {
  console.log(apiKey)
  console.log(ouncesPerGram)
  console.log(process.env.SERVER_PORT)
  console.log(test)
  console.log(`Server is listening on port ${SERVER_PORT}`)
})

