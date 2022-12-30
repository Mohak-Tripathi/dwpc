const express= require('express');
const router= express.Router();

const {getApModeSsid, changeApModeSsid,  changeApModePassword, setVariant, getVariant} = require("../controllers/adminController")

const {isAuthenticated, isAuthorizeRoles} = require("../middleware/is-auth.js");

router.use(isAuthenticated)

router.get("/variant", isAuthorizeRoles("Production"), getVariant)

router.post("/variant", isAuthorizeRoles("Production"), setVariant);

router.get("/ap_mode_ssid", isAuthorizeRoles("Production"),  getApModeSsid);
router.post("/ap_mode_ssid",   isAuthorizeRoles("Production"), changeApModeSsid);

router.post("/ap_mode_ssid_pass", isAuthorizeRoles("Production"),  changeApModePassword);

module.exports = router;