const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    maria = new User({ name: "Maria" });
    alex = new User({ name: "Alex" });
    zach = new User({ name: "Zach" });

    Promise.all([joe.save(), maria.save(), alex.save(), zach.save()]).then(() =>
      done()
    );
  });

  it("finds all users with a name of joe", async () => {
    const users = await User.find({ name: "Joe" });
    assert(users[0]._id.toString() === joe._id.toString());
  });

  it("finds a user with a particular id", async () => {
    const user = await User.findById(joe._id);
    assert(user.name === "Joe");
  });

  it("can skip and limit the result set", async () => {
    const users = await User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2);
    assert(users.length === 2);
    assert(users[0].name === "Joe");
    assert(users[1].name === "Maria");
  });
});
