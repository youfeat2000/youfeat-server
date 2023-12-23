const fs = require("fs");
const { google } = require('googleapis');
const User = require("../schema/userSchema");
const { OAuth2Client } = require('google-auth-library');
const readline = require('readline')
const credentials = require('../client_secret_620244021144-4sqgj7pe733vmmj7isaeg2d3ansg8ajm.apps.googleusercontent.com.json')

// Function to upload video using multer and mongoose
const uploadVideo = (req, res) => {
  console.log(credentials)
  const { client_secret, client_id, auth_uri, token_uri, auth_provider_x509_cert_url } = credentials.web;

const tokenPath = '../token.json'; 

const SCOPES = ['https://www.googleapis.com/auth/youtube.upload'];
const oauth2Client = new OAuth2Client(client_id, client_secret, token_uri);

// Function to authorize the user and get the OAuth 2.0 credentials
async function authorize() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this URL:', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oauth2Client.getToken(code, (err, token) => {
        if (err) {
          return reject(err);
        }
        oauth2Client.setCredentials(token);
        // Store the token for later use
        fs.writeFileSync(tokenPath, JSON.stringify(token));
        resolve(oauth2Client);
      });
    });
  });
}
const  upload = async()=>{
const auth = await authorize()
const VIDEO_FILE_PATH = `videos/${req.file.filename}`;
const CHANNEL_ID = process.env.CHANNEL_ID;

const youtube = google.youtube({
  version: 'v3',
  auth: auth,
});

// Set the video resource parameters
const videoResource = {
  part: 'contentDetails',
  snippet: {
    title: req.body.title,
    description: req.body.description,
    part: VIDEO_FILE_PATH,
    categoryId: '22', // Replace with the appropriate category ID (e.g., 22 for Entertainment)
  },
  status: {
    privacyStatus: 'private', // You can set the privacy status (private, public, unlisted)
  },
};

// Set the media upload parameters
const mediaUpload = {
  part: 'snippet',
  requestBody: videoResource,
  media: {
    body: fs.createReadStream(VIDEO_FILE_PATH),
  },
};

// Upload the video using the videos.insert method
youtube.videos.insert(mediaUpload, (err, res) => {
  if (err) {
    console.error('Error uploading video:', err);
    return;
  }

  const videoId = res.data.id;
  
  console.log(`Video uploaded successfully. Video ID: ${videoId}`);

  User.findByIdAndUpdate(req.body.userId, {
    video: {
      filename: `https://www.youtube.com/watch?v=${videoId}`,
      contentType: req.file.mimetype,
      title: req.body.title,
      catigory: req.body.catigory,
      description: req.body.description,
    },
  })
  .then((data) => res.status(200).send(data))
  .finally(()=>{
    // Add the uploaded video to the specified channel
  youtube.channels.update({
    part: '',
    requestBody: {
      id: CHANNEL_ID,
      contentDetails: {
        relatedPlaylists: {
          uploads: videoId,
        },
      },
    },
  }, (err, res) => {
    if (err) {
      console.error('Error updating channel:', err);
      return;
    }
    console.log('Video added to channel successfully.');
  });
  })
})
}
upload()
};

module.exports = uploadVideo;
