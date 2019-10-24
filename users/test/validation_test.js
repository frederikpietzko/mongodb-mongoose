const assert = require("assert");
const User = require("../src/user");

describe("Validating records", () => {
  it("require a user name", () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Name is required.");
  });
  it("user name is at least 3 letters long", () => {
    const user = new User({ name: "al" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Name must be longer that 2 characters.");
  });
  it("disallows invalid records from being saved", async () => {
    const user = new User({ name: "al" });
    try {
      user.save();
    } catch (error) {
      const { message } = validationResult.errors.name;
      assert(message === "Name must be longer that 2 characters.");
    }
  });
});
