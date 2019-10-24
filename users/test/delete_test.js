const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
  let joe;

  beforeEach(async () => {
    joe = new User({ name: "Joe" });
    await joe.save();
  });

  /**
   * Removes the specific entry that the instance points to.
   * this is apperently deprecated.
   */
  it("model instance remove", async () => {
    await joe.remove();
    const user = await User.findOne({ name: "Joe" });
    assert(user === null);
  });

  /**
   * Removes all records with given common criteria.
   */
  it("class method remove", async () => {
    await User.remove();
    const user = await User.findOne({ name: "Joe" });
    assert(user === null);
  });

  it("class method findOneAndRemove", async () => {
    await User.findOneAndRemove({ name: "Joe" });
    const user = await User.findOne({ name: "Joe" });
    assert(user === null);
  });

  it("class method findByIdAndRemove", async () => {
    await User.findByIdAndRemove(joe._id);
    const user = await User.findOne({ name: "Joe" });
    assert(user === null);
  });
});
