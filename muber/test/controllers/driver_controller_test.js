const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");

const Driver = mongoose.model("driver");

describe("Drivers controller", () => {
  it("Posts to /api/drivers creates a new driver", async () => {
    const amount = await Driver.countDocuments();
    await request(app)
      .post("/api/drivers")
      .send({ email: "someemail@test.com" });
    const newAmount = await Driver.countDocuments();
    assert(amount + 1 === newAmount);
  });
  it("PUT to /api/drivers/id edits an existing driver", async () => {
    let driver = await Driver.create({ email: "t@t.com", driving: false });
    await request(app)
      .put(`/api/drivers/${driver._id}`)
      .send({ driving: true });
    driver = await Driver.findOne({ email: "t@t.com" });
    assert(driver.driving === true);
  });
  it("DELETE to /api/drivers/id deletes a driver", async () => {
    let driver = await Driver.create({ email: "t@t.com" });
    await request(app).delete(`/api/drivers/${driver._id}`);
    driver = await Driver.findOne({ email: "t@t.com" });
    assert(driver === null);
  });
  it("GET to /api/drivers finds drivers in a location", async () => {
    await Driver.create({
      email: "seattle@test.com",
      geometry: { type: "Point", coordinates: [-122.475992, 47.6147628] }
    });
    await Driver.create({
      email: "miami@test.com",
      geometry: { type: "Point", coordinates: [-80.253, 25.791] }
    });
    const res = await request(app).get("/api/drivers?lng=-80&lat=25");
    const foundDivers = res.body;
    assert(foundDivers.length === 1);
    assert(foundDivers[0].email === "miami@test.com");
  });
});
