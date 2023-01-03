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
//  const fs = require("fs");

 app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}
));

 

//  const { authentication } = require("./middelware/is-auth");
 
 const jwt = require("jsonwebtoken");
 const cookieParser = require("cookie-parser");
 const bcrypt = require("bcryptjs");
 const md5 = require("md5");

 const adminRoutes = require("./router/adminRoute");
const mqttRoutes = require("./router/mqttRoute");
 const serviceRoutes = require("./router/serviceRoute");
 const networkRoutes = require("./router/networkRoute");
 const inferenceRoutes = require("./router/inferenceRoute");
 const authRoutes = require("./router/authRoute")
 
 app.use(cookieParser());
 
 app.use(bodyParser.json());
 
//  app.use(express.static(path.join(__dirname, "public", "build")));


 app.use("/api/v1", authRoutes);
 app.use("/api/v1/admin", adminRoutes);
 app.use("/api/v1/mqtt", mqttRoutes);
  app.use("/api/v1/service", serviceRoutes);
 app.use("/api/v1/network", networkRoutes);
 app.use("/api/v1/inference", inferenceRoutes);


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
 