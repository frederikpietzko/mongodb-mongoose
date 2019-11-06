const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://localhost/muber", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

require("./models");

const app = express();

app.use(bodyParser.json());

require("./routes/routes")(app);

app.use((err, req, res, next)=> {
  
})

module.exports = app;
