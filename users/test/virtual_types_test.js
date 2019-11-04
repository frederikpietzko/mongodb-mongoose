const assert = require("assert");
const User = require("../src/user");

describe("Vistual types", () => {
  it("postCount return number of posts", async () => {
    const joe = new User({ name: "Joe", posts: [{ title: "PostTitle" }] });
    await joe.save();
    const user = await User.findOne({ name: "Joe" });
    assert(user.postCount === 1);
  });
});
