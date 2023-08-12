const fs = require("fs");
const User = require("../schema/userSchema");

// Function to upload video using multer and mongoose
const uploadVideo = (req, res) => {
  User.findById(req.body.userId)
    .then((data) => {
      console.log(data);
      if (data.video) {
        fs.unlinkSync(`videos/${data.video.filename}`);
      }
    })
    .catch((err) => console.log(err));
  User.findByIdAndUpdate(req.body.userId, {
    video: {
      filename: req.file.filename,
      contentType: req.file.mimetype,
      title: req.body.title,
      catigory: req.body.catigory,
      description: req.body.description,
    },
  }).then((data) => res.status(200).send(data));
};

module.exports = uploadVideo;
