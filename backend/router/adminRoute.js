const express= require('express');
const router= express.Router();

const { getAdminInfo, changeApModeSsid,  changeApModePassword, setVariant, setOtaUpdate,  setWifiStatusUpdate} = require("../controllers/adminController")

const {isAuthenticated, isAuthorizeRoles} = require("../middleware/is-auth.js");

router.use(isAuthenticated)

// router.get("/variant", isAuthorizeRoles("Production"), getVariant)

router.post("/variant", isAuthorizeRoles("Production"), setVariant);

router.post("/ap_mode_ssid",   isAuthorizeRoles("Production"), changeApModeSsid);

router.post("/ap_mode_ssid_pass", isAuthorizeRoles("Production"),  changeApModePassword);
router.post("/ota", isAuthorizeRoles("Production"),  setOtaUpdate);
// router.get("/ota", isAuthorizeRoles("Production"),  getOtaUpdate);

router.post("/wifi-status", isAuthorizeRoles("Production"),  setWifiStatusUpdate);
// router.get("/wifi-status", isAuthorizeRoles("Production"),  getWifiStatusUpdate);



//relevant
router.get("/admin_info", isAuthorizeRoles("Production"), getAdminInfo);

module.exports = router;