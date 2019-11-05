const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("middleware", () => {
  let joe, blogPost;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Jup it really is"
    });

    joe.blogPosts.push(blogPost);

    // this actually executes all promises in parallel instead of async / await which would mean we wait for each promise to complete before saving the next!
    Promise.all([joe.save(), blogPost.save()]).then(() => {
      done();
    });
  });

  it("users clean up dangeling blogposts on remove", async () => {
    await joe.remove();
    const blogPostcount = await BlogPost.count();
    assert(blogPostcount === 0);
  });
});
