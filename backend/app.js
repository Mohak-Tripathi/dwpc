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

//  const adminRoutes = require("./router/admin");
//  const mqttRoutes = require("./router/mqtt");
//  const serviceRoutes = require("./router/service");
//  const networkRoutes = require("./router/network");
//  const inferenceRoutes = require("./router/inference");
 const authRoutes = require("./router/authRoute")
 
 app.use(cookieParser());
 
 app.use(bodyParser.json());
 





//  app.use(express.static(path.join(__dirname, "public", "build")));

//  app.use(authentication);


 app.use("/api/v1", authRoutes);
//  app.use("/api/v1/adminRoute", adminRoutes);
//  app.use("/api/v1/mqttRoute", mqttRoutes);
//  app.use("/api/v1/serviceRoute", serviceRoutes);
//  app.use("/api/v1/networkRoute", networkRoutes);
//  app.use("/api/v1/inferenceRoute", inferenceRoutes);


//  app.get("/", (req, res) => {

//    res.sendFile(path.join(__dirname, "public", "build", "index.html"));
//  });

 
 app.listen(8080, "0.0.0.0", () => {
   console.log("server running at http://localhost:8080");
 });


  
 /******************  Added by MOHAK T*************/
 
 // Users login Id and password
 //Devteam@@900 = Password
 //Support@@123 = Password
 //Demo421@@ = Password
 /******************  Added by MOHAK T*************/
 