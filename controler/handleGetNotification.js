const Notification = require("../schema/notificationSchema");

const handleGetNotification = (req, res) => {
  Notification.find()
    .then((data) => res.send(data))
    .catch((err) => res.sendStatus(400));
};

module.exports = handleGetNotification;
