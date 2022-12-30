

const express= require('express');
const router= express.Router();

const {changeNtpServer, staticIpEtherent,   wifiCredentials,   staticIpWifi,  getNetworkInfo, getNtpServer} = require("../controllers/networkController")

const {isAuthenticated, isAuthorizeRoles} = require("../middleware/is-auth.js");

router.use(isAuthenticated)

router.post(
    "/ntp_server", 
    isAuthorizeRoles( "Production", "Support"),

    changeNtpServer
  );


  router.post(
    "/static_ip_eth",

    isAuthorizeRoles("Production", "Support"), 
    staticIpEtherent
  );


  router.post(
    "/cred",
    isAuthorizeRoles("Production", "Support"), 
    wifiCredentials
  );



  router.post(
  "/static_ip_wifi",
    isAuthorizeRoles("Production", "Support"), 
  staticIpWifi
);

router.get("/nwk",   isAuthorizeRoles("Production", "Support"), getNetworkInfo);
router.get("/get_ntp_server", isAuthorizeRoles("Production", "Support"),   getNtpServer);



  module.exports = router