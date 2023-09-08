const express = require("express");
const handleRegister = require("../controler/handleRegister");
const handleRefresh = require("../controler/handleRefresh");
const handleVideoUploads = require("../controler/handleVideoUploads");
const handleVideoStreem = require("../controler/handleVideoStreem");
const handleLogin = require("../controler/handleLogin");
const upload = require("../midlewear/upload");
const handleLogout = require("../controler/handleLogout");
const handleGetUser = require("../controler/handleGetUser");
const handleProfileImage = require("../controler/handleProfileImage");
const uploadImage = require("../midlewear/uploadImage");
const handleGetProfileImage = require("../controler/handleGetProfileImage");
const handleGetAllUsers = require("../controler/handleGetAllUsers");
const handleBioUpdate = require("../controler/handleUpdateBio");
const handleVote = require("../controler/handleVote");
const handleGetVote = require("../controler/handleGetVote");
const handleNotification = require("../controler/handleNotification");
const handleGetNotification = require("../controler/handleGetNotification");
const handleComment = require("../controler/handleComment");
const handleGetComment = require("../controler/handleGetComment");
const route = express.Router();

route.post("/signup", handleRegister);

route.post("/logout", handleLogout);

route.post("/refresh", handleRefresh);

route.post("/user", handleGetUser);

route.post("/users", handleGetAllUsers);

route.post("/vote", handleVote);

route.post("/comment", handleComment);

route.post("/allcomment", handleGetComment);

route.post("/notify", handleNotification);

route.post("/notification", handleGetNotification);

route.post("/allvote", handleGetVote);

route.post("/profile/:userid", uploadImage, handleProfileImage);

route.post("/bio/:id", handleBioUpdate);

route.get("/video/:filename", handleVideoStreem);

route.get("/image/:profilename", handleGetProfileImage);

route.post("/videouploads", upload, handleVideoUploads);

route.post("/login", handleLogin);

module.exports = route;
