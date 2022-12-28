/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  app.js 

Brief:  Entry point of project. Contain login logic
Project: DWPC Web UI

Release version: version 1.0.0

// Release Date: Dec 14, 2022

Auther: Mohak Tripathi

Whats New: EVERYTHING
 ..........................*/

 const path = require("path");
 const express = require("express");
 const bodyParser = require("body-parser");
 
 const app = express();
 const cors = require("cors");

 app.use( cors());
 
 const fs = require("fs");
//  const { authentication } = require("./middelware/is-auth");
 
 const jwt = require("jsonwebtoken");
 const cookieParser = require("cookie-parser");
 const bcrypt = require("bcryptjs");
 const md5 = require("md5");

 const adminRoutes = require("./routes/admin");
 const mqttRoutes = require("./routes/mqtt");
 const serviceRoutes = require("./routes/service");
 const networkRoutes = require("./routes/network");
 const inferenceRoutes = require("./routes/inference");
 const login = require(".routes/login")
 
 app.use(cookieParser());
 
 app.use(bodyParser.json());
 

 const loginApi = (req, res) => {
   const { username, password } = req.body;
 
   const config = JSON.parse(fs.readFileSync("./config.json"));
 
   let targetObject = config.credentials.filter((elem) => {
     return elem.app_user === username;
   });
 
   if (
     username === targetObject[0].app_user &&
     password === targetObject[0].app_password
   ) {
     const token = jwt.sign(
       { username: username },
       "pixelSensorProject@fTIoTDev",
       {
         expiresIn: "1h", // expires in 1 hours
       }
     );
 
     // res.cookie("jwt", token, {
     //   enabled: true,
     //   httpOnly: true,
     //   secure: false,
     //   maxAge: 3600000,
     //   // SameSite: "None",
     //   // Path: "/"
     // });
 
     return res
       .status(200)
       .cookie("jwt", token, {
         // enabled: true,
         httpOnly: true,
         Secure: true,
         maxAge: 3600000,
         SameSite: "None",
 
         // Path: "/"
       })
       .json({
         user: targetObject[0],
       });
   } else {
     return res.status(400).json({
       success: false,
       message: "Incorrect username or password",
     });
   }
 };
 /******************  Added by MOHAK T*************/
 
 /******************  Added by MOHAK T*************/
 const getUserProfile = (req, res, next) => {
   const config = JSON.parse(fs.readFileSync("./config.json"));
 
   let targetObject = config.credentials.filter((elem) => {
     return elem.app_user === req.username.app_user;
   });
 
   return res.status(200).json({
     user: targetObject[0],
   });
 };
 /******************  Added by MOHAK T*************/
 
 /******************  Added by MOHAK T*************/
 
 // Users login Id and password
 //Devteam@@900 = Password
 //Support@@123 = Password
 //Demo421@@ = Password
 /******************  Added by MOHAK T*************/
 
 // {
 //   "app_user": "Admin",
 //   "app_password": "a2d87b62deb0786961622c001f8c80bc",
 //   "role": "Admin"
 // },
 
 //**************Content of JSON files (added by MT)**********/
 // "credentials": {
 // 	"app_user": "Admin",
 // 	"app_password": "a2d87b62deb0786961622c001f8c80bc"
 // },
 
 // "network_info": {
 //   "nwk_interface": "",
 //   "static_ip": "",
 //   "gateway_ip": "",
 //   "SSID": "PS-1456",
 //   "password": null
 // },
 //**************Content of JSON files (added by MT)***********/
 
 app.post("/login", loginApi);
 /******************  Added by MOHAK T*************/
 app.use(express.static(path.join(__dirname, "public", "build")));
 /******************  Added by MOHAK T*************/
 app.use(authentication);
 
 /******************  Added by MOHAK T*************/
 app.get("/me", getUserProfile);
 /******************  Added by MOHAK T*************/
 app.use("/api/wifi", wifiRoutes);
 app.use("/api/config", configRoutes);
 app.use("/api/service", serviceRoutes);
 
 //app.use(express.static(path.join(__dirname, "frontend/build" )))
 
 /******************  Added by MOHAK T*************/
 app.get("/", (req, res) => {
   //res.sendFile(path.resolve(__dirname, "frontend/build/index.html"))
   res.sendFile(path.join(__dirname, "public", "build", "index.html"));
 });
 /******************  Added by MOHAK T*************/
 
 // "targets": [
 //   "node14-linux-arm64"
 // ],
 // "startM": "node app.js",
 
 app.listen(8080, "0.0.0.0", () => {
   console.log("server running at http://localhost:8080");
 });
 