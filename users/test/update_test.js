const assert = require("assert");
const User = require("../src/user");
const mongoose = require("mongoose");

describe("Updateing records", () => {
  let joe;

  beforeEach(async () => {
    joe = new User({ name: "Joe", postCount: 0 });
    await joe.save();
  });

  const assertName = async operation => {
    await operation;
    const users = await User.find({});
    assert(users.length === 1);
    assert(users[0].name === "Alex");
  };

  it("a instance can set and save", async () => {
    joe.set("name", "Alex");
    await assertName(joe.save());
  });

  it("a model instance can update", async () => {
    await assertName(joe.update({ name: "Alex" }));
  });

  it("a class can update", async () => {
    await assertName(User.update({ name: "Joe" }, { name: "Alex" }));
  });

  it("a class can findOneAndUpdate", async () => {
    await assertName(User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }));
  });

  it("a class can findIdAndUpdate", async () => {
    await assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }));
  });

  /**
   * Using the $inc operaterator of mongoDB
   */
  it("A user can have their postcount incremented by 1", async () => {
    await User.update({ name: "Joe" }, { $inc: { postCount: 1 } });
    const user = await User.findOne({ name: "Joe" });
    assert(user.postCount === 1);
  });
});
