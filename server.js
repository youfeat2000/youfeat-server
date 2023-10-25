const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const User = require('./schema/userSchema')
const route = require("./router/allRouts");
const port = 3500;
const app = express();
require("dotenv").config();
//const db = "mongodb://127.0.0.1:27017/youfeat";
const uri = 'https://www.youfeat.ng';
//const uri = "http://localhost:3000";
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
app.use(
  cors({
    credentials: true,
    origin: uri
  })
);

app.use(route);
