const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
  it("can create a subdocument", async () => {
    const joe = new User({ name: "Joe", posts: [{ title: "PostTitle" }] });
    await joe.save();
    const user = await User.findOne({ name: "Joe" });
    assert(user.posts[0].title === "PostTitle");
  });
  it("can add a subdocuments to an existing record", async () => {
    // please note that one does not have to initialize posts like below if there are no posts. mongoose will take care of that thanks to the schema for us.
    const joe = new User({ name: "Joe", posts: [] });
    await joe.save();
    let user = await User.findOne({ name: "Joe" });
    user.posts.push({ title: "New Post" });
    await user.save();
    user = await User.findOne({ name: "Joe" });
    assert(user.posts[0].title === "New Post");
  });
  it("can remove an existing subdocuments", async () => {
    const joe = new User({ name: "Joe", posts: [{ title: "New Title" }] });
    await joe.save();
    let user = await User.findOne({ name: "Joe" });
    user.posts[0].remove();
    await user.save();
    user = await User.findOne({ name: "Joe" });
    assert(user.posts.length === 0);
  });
});
