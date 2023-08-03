const Notification = require("../schema/notificationSchema");

const handleNotification = (req, res) => {
  const { from, to, message, date } = req.body;

  const newNotification = new Notification({
    from,
    to,
    message,
    date,
  });
  newNotification
    .save()
    .then((data) => res.send(data))
    .catch((err) => res.sendStatus(400));
};

module.exports = handleNotification;
