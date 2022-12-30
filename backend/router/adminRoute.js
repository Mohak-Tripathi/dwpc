const express= require('express');
const router= express.Router();

const {getApModeSsid, changeApModeSsid,  changeApModePassword} = require("../controllers/adminController")

const {isAuthenticated, isAuthorizeRoles} = require("../middleware/is-auth.js");

router.use(isAuthenticated)


router.get("/get_apmode_ssid", isAuthorizeRoles("Production", "Support"),  getApModeSsid);
router.post("/ap_mode_ssid",   isAuthorizeRoles("Production"), changeApModeSsid);

router.post("/ap_mode_ssid_pass", isAuthorizeRoles("Production"),  changeApModePassword);

module.exports = router;