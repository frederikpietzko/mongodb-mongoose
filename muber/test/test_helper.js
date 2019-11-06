const mongoose = require("mongoose");

before(async () => {
  try {
    await mongoose.connect("mongodb://localhost/muber_test", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.warn("Warning", error);
  }
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers
    .drop()
    .then(() => done())
    .catch(() => done());
});
