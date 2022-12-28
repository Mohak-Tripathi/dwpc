/*........................

Copyright (c) 2022, FlamencoTech India Pvt. Ltd.
All rights reserved.

file:  is-auth.js

Brief:  It contains authentication and authorization logic. 

Project: DWPC

Release version: version 1.0.0

// Release Date: Dec 14, 2022

Auther: Mohak Tripathi


 ..........................*/


 const jwt = require("jsonwebtoken");
 const fs = require("fs");
 const path = require("path");

 
 
 // module.exports = async (req, res, next) => {
 
   const authentication = async(req,res,next) => {
   const token = req.cookies.jwt;
   console.log(token, "mttoken")
 
   try {
     if (!token) {
       return res.status(401).json({ message: "Not Authenticated" });
 
     }
     const decrypt = await jwt.verify(token, "DwpcProject@fTIoTDev");

     const config = JSON.parse(fs.readFileSync("./config.json"));
 
 
     let targetObject = config.credentials.filter((elem) => {
       return elem.app_user === decrypt.username;
     });
 
     req.username = targetObject[0];
 console.log(req.username, "kkl")
     next();
   } catch (err) {
     return res.status(500).json(err.toString());
   }
 };
 
 
 
 
 //***************Added by Mohak****************/
 
 // Handling users roles
  const authorizeRoles = (...roles) => {
   return (req, res, next) => {
     if (!roles.includes(req.username.role)) {   //req.username attched in authentication
 
       return res.status(403).json({ message: "Not Authorized" });
 
     }
     //403 forbidden request
     next()
   }
 }
       /******************  Added by MOHAK T*************/
 module.exports = {authentication, authorizeRoles};
 
   