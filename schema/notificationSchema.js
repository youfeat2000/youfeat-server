const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  from: {
    require: true,
    type: String,
  },
  to: {
    require: true,
    type: String,
  },
  message: {
    require: true,
    type: String,
  },
  date: {
    require: true,
    type: String,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
