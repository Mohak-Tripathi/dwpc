const express = require('express');
const router = express.Router();

const { calliberate, factoryReset, reboot} = require("../controllers/serviceController")

const {isAuthenticated, isAuthorizeRoles} = require("../middleware/is-auth.js");

router.use(isAuthenticated)

router.post("/calliberate", isAuthorizeRoles("Production", "Support"), calliberate)
router.post("/factory-reset", isAuthorizeRoles("Production", "Support"), factoryReset)
router.post("/reboot", isAuthorizeRoles("Production", "Support"), reboot)


module.exports = router;