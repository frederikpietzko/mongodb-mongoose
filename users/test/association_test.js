const assert = require("assert");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe("Assocation", () => {
  let joe, blogPost, comment;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Jup it really is"
    });
    comment = new Comment({ content: "Congrats on that great post!" });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    // this actually executes all promises in parallel instead of async / await which would mean we wait for each promise to complete before saving the next!
    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() => {
      done();
    });
  });

  it("saves a realtion between a user and a blogpost", async () => {
    const user = await User.findOne({ name: "Joe" }).populate("blogPosts");
    assert(user.blogPosts[0].title === "JS is Great");
  });
  it("saves a full realtion graph", async () => {
    const user = await User.findOne({ name: "Joe" }).populate({
      path: "blogPosts",
      model: "blogpost",
      populate: {
        path: "comments",
        model: "comment",
        populate: {
          path: "user",
          model: "user"
        }
      }
    });
    assert(user.name === "Joe");
    assert(user.blogPosts[0].title === "JS is Great");
    assert(
      user.blogPosts[0].comments[0].content === "Congrats on that great post!"
    );
    assert(user.blogPosts[0].comments[0].user.name === "Joe"); // FUll INCEPTION MODE
  });
});
