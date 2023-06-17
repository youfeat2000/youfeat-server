const User = require("../schema/userSchema");

// Function to upload video using multer and mongoose
const uploadVideo = (req, res) => {
  User.findByIdAndUpdate(req.body.userId, {
    video: {
      filename: req.file.filename,
      contentType: req.file.mimetype,
      title: req.body.title,
      catigory: req.body.catigory,
      description: req.body.description,
    },
  }).then(() => res.sendStatus(200));
};

module.exports = uploadVideo;
