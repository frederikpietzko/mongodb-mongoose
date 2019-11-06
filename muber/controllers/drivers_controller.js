const mongoose = require("mongoose");

const Driver = mongoose.model("driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },
  create(req, res) {
    Driver.create(req.body).then(driver => {
      res.send(driver);
    });
  }
};
