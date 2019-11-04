const mongoose = require("mongoose");

/**
 * A hook that runs once before the tests get started.
 */
before(done => {
  mongoose.connect("mongodb://localhost/users_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", error => console.warn("Warning", error));
});

/**
 * A hook that gets called before each test runs.
 * Here we drop collections so each test gets executed in isolation.
 */
beforeEach(async () => {
  try {
    const { users, comments, blogposts } = await mongoose.connection
      .collections;
    await users.drop();
    await comments.drop();
    await blogposts.drop();
  } catch {} // needs to be there so the test doesnt fail if collections dont exist yet...
});
