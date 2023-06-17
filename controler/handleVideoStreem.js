const fs = require("fs");
const handleVideoStreem = async (req, res) => {
  try {
    const { filename } = req.params;
    const range = req.headers.range;

    const videoPath = `videos/${filename}`;
    const fileSize = fs.statSync(`videos/${filename}`).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
    const contentLength = end - start + 1;

    const header = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Range": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, header);
    fs.createReadStream(videoPath, { start, end }).pipe(res);
  } catch (err) {
    res.sendStatus(400);
    console.log(err);
  }
};

module.exports = handleVideoStreem;
