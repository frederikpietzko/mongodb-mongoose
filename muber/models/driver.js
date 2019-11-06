const mongoose = require("mongoose");
const { Schema } = mongoose;

const DriverSchema = new Schema({
  emal: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  }
});

mongoose.model("driver", DriverSchema);
