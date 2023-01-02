/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  upload.js

Brief:  It contains file upload logic through multer npm package in mqtt page.  

Project: Pixel Sensor

Release version: version 1.0.0

// Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: Everything
 ..........................*/



//middleware for handling multipart/form-data
const multer = require("multer");
const fs = require('fs')
//built-in module To handle file paths
var path = require("path");

//file storage configuration

const storage = multer.diskStorage({
  //setting destination to save the file on the server
  destination: (req, file, cb) => {

    //directory to the file
    cb(null, "./mqtt_certs");
  },
  //setting filename for the uploaded file
  filename: (req, file, cb) => {

    cb(null, file.originalname);
  },
});



//multer configuration
const upload = multer({ storage: storage, 
limits: { fileSize: 1024 * 1024 * 1024}
});




const storage2 = multer.diskStorage({

    //setting destination to save the file on the server
    destination: (req, file, cb) => {
  
  
      //directory to the file
      cb(null, "./mqtt_certs_sec");
    },
    //setting filename for the uploaded file
    filename: (req, file, cb) => {
  
      cb(null, file.originalname);
    },
  });
  
  
  
  //multer configuration
  const upload2 = multer({ storage: storage2, 
  limits: { fileSize: 1024 * 1024 * 1024}
  });

module.exports = {upload, upload2};
