

const express= require('express');
const router= express.Router();

const {changeNtpServer,
     wifiCredentials,  
      staticIpWifi, 
       getNetworkInfo, 
       getNtpServer,  
        wifiCredentialsApply, 
        staticIpWifiApply,
        changeNtpServerApply
      } = require("../controllers/networkController")

const {isAuthenticated, isAuthorizeRoles} = require("../middleware/is-auth.js");

router.use(isAuthenticated)

router.post(
    "/ntp_server", 
    isAuthorizeRoles( "Production", "Support"),
    changeNtpServer
  );


  // router.post(
  //   "/static_ip_eth",
  //   isAuthorizeRoles("Production", "Support"), 
  //   staticIpEtherent
  // );


  router.post(
    "/cred",
    isAuthorizeRoles("Production", "Support"), 
    wifiCredentials
  );



  router.post(
  "/static_ip",
    isAuthorizeRoles("Production", "Support"), 
  staticIpWifi
);

router.get("/nwk",   isAuthorizeRoles("Production", "Support"), getNetworkInfo);
router.get("/get_ntp_server", isAuthorizeRoles("Production", "Support"),   getNtpServer);

//apply
router.post(
  "/cred_apply",
  isAuthorizeRoles("Production", "Support"), 
  wifiCredentialsApply
);

router.post(
  "/static_ip_wifi_apply",
    isAuthorizeRoles("Production", "Support"), 
  staticIpWifiApply
);

// router.post(
//   "/static_ip_eth_apply",
//   isAuthorizeRoles("Production", "Support"), 
//   staticIpEtherentApply
// );

router.post(
  "/ntp_server_apply", 
  isAuthorizeRoles( "Production", "Support"),
  changeNtpServerApply
);



  module.exports = router