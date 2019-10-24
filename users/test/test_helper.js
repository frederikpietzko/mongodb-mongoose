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
beforeEach(done => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});
