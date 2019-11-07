const mongoose = require("mongoose");

const Driver = mongoose.model("driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },
  index(req, res, next) {
    const { lng, lat } = req.query;
    const point = {
      type: "Point",
      coordinates: [parseFloat(lng), parseFloat(lat)]
    };
    Driver.aggregate([
      {
        $geoNear: {
          near: point,
          distanceField: "dist.calculated",
          maxDistance: 200000,
          spherical: true
        }
      }
    ])
      .then(drivers => res.send(drivers))
      .catch(next);
  },
  create(req, res, next) {
    Driver.create(req.body)
      .then(driver => {
        res.send(driver);
      })
      .catch(next);
  },
  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate(driverId, driverProps)
      .then(() => Driver.findById(driverId))
      .then(driver => res.send(driver))
      .catch(next);
  },
  delete(req, res, next) {
    Driver.findByIdAndRemove(req.params.id)
      .then(deleted => res.status(204).send(deleted))
      .catch(next);
  }
};
