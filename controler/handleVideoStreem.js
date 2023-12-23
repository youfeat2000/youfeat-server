const fs = require("fs");
const ytdl = require('ytdl-core');

const handleVideoStreem = async (req, res) => {
  try {
    const { filename } = req.params;
    const videoUrl = filename;

    const header = {
      "Accept-Range": "bytes",
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, header);

  // Stream the video
    const videoStream = ytdl(videoUrl, { filter: 'audioandvideo', quality: 'highestvideo' });
    videoStream.pipe(res);

  videoStream.on('error', (err) => {
    console.error('Error streaming video:', err);
    res.status(500).send('Error streaming video');
  });
  } catch (err) {
    res.sendStatus(400);
    console.log(err);
  }
};

module.exports = handleVideoStreem;
