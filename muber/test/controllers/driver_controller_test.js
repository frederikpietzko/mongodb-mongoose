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
      .send({ emal: "someemail@test.com" });
    const newAmount = await Driver.countDocuments();
    assert(amount + 1 === newAmount);
  });
});
