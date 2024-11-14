const express = require('express');
const { createUser, createAccountLogin, HanldeGetUsers, handleCreateProfile, hanldeGetProfile, handleUploadImg, hanldeDeleteProfile, hanldeUpdateProfile} = require('../controllers/useController');
const delay = require('../middlesware/delay');
const auth = require('../middlesware/auth');
const multer = require('multer');
const routerAPI = express.Router();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "demo-uploadImage",
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage: storage });


routerAPI.all("*", auth);
routerAPI.get('/users', (req, res) => {
    return res.status(200).json("hell word")
});
routerAPI.post('/register', createUser);
routerAPI.post('/logins', createAccountLogin);
routerAPI.get('/GetAllUser', HanldeGetUsers);
routerAPI.post('/postProfile', handleCreateProfile);
routerAPI.get('/GetAllProfile/:id', hanldeGetProfile);
routerAPI.delete('/DeleteProfile/:id', hanldeDeleteProfile);
routerAPI.put('/UpdateProfile/:id', hanldeUpdateProfile);
routerAPI.post( '/Upload', upload.fields([{ name: "img", maxCount: 1 }]),handleUploadImg); 
// routerAPI.post('/users', postCreateUserAPI);
// routerAPI.put('/users', putUpdateUserAPI)
;
// routerAPI.delete('/users', deleteUserAPI);



module.exports = routerAPI; //export default