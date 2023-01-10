const express= require('express');
const router= express.Router();

const { getAdminInfo, changeApModeSsid,  changeApModePassword, setVariant, setOtaUpdate,  setWifiStatusUpdate, setApplyVariant, changeApModeSsidApply, changeApModeApplyPassword, setOtaApplyUpdate, setWifiStatusApplyUpdate, dcUpdate} = require("../controllers/adminController")

const {isAuthenticated, isAuthorizeRoles} = require("../middleware/is-auth.js");

router.use(isAuthenticated)

// router.get("/variant", isAuthorizeRoles("Production"), getVariant)

router.post("/variant", isAuthorizeRoles("Production"), setVariant);

//apply 
router.post("/variant_apply", isAuthorizeRoles("Production"), setApplyVariant);

router.post("/ap_mode_ssid",   isAuthorizeRoles("Production"), changeApModeSsid);
//apply
router.post("/ap_mode_ssid_apply",   isAuthorizeRoles("Production"), changeApModeSsidApply);

router.post("/ap_mode_ssid_pass", isAuthorizeRoles("Production"),  changeApModePassword);
//apply
router.post("/ap_mode_ssid_pass_apply", isAuthorizeRoles("Production"),  changeApModeApplyPassword);

router.post("/ota", isAuthorizeRoles("Production"),  setOtaUpdate);

//apply
router.post("/ota_apply", isAuthorizeRoles("Production"),  setOtaApplyUpdate);

// router.get("/ota", isAuthorizeRoles("Production"),  getOtaUpdate);

router.post("/wifi-status", isAuthorizeRoles("Production"),  setWifiStatusUpdate);

//apply
router.post("/wifi-status_apply", isAuthorizeRoles("Production"),  setWifiStatusApplyUpdate);
// router.get("/wifi-status", isAuthorizeRoles("Production"),  getWifiStatusUpdate);


//relevant
router.get("/admin_info", isAuthorizeRoles("Production"), getAdminInfo);

// router.post("/dc_test",  dcUpdate);

module.exports = router;