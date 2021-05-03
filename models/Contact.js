const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  type: {
    type: String,
    default: "personal",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("contact", ContactSchema);
