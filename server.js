const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const route = require("./router/allRouts");
const port = 3500;
const app = express();
require("dotenv").config();

//const db = "mongodb://127.0.0.1:27017/youfeat";
const db = process.env.DB_URL;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log("listening !!!");
    });
  })
  .catch((err) => console.log(err));
app.use(express.json());
app.use(cookieparser());

// Define an array of allowed origins
const allowedOrigins = [
  'https://youfeat.ng',
  "https://youfeat.ng/*",
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the request origin is in the allowedOrigins array
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.get("/", (req, res)=>{
  res.send({youfeat: "welcome"})
})

app.use(route);
