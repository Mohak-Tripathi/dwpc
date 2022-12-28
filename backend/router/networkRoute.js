

const express= require('express');
const router= express.Router();

const {changeNtpServer, staticIpEtherent} = require("../controllers/networkController")

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

  module.exports = router