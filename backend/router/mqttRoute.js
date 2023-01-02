const express = require('express');
const router = express.Router();

const {setmqttOneDestination, getmqttOneDestination, setmqttTwoDestination, getmqttTwoDestination} = require("../controllers/mqttController")

const {isAuthenticated, isAuthorizeRoles} = require("../middleware/is-auth.js");

router.use(isAuthenticated)

router.post("/mqtt_one", isAuthorizeRoles("Production", "Support"), setmqttOneDestination)
router.get("/mqtt_one", isAuthorizeRoles("Production", "Support"), getmqttOneDestination)

router.post("/mqtt_two", isAuthorizeRoles("Production", "Support"), setmqttTwoDestination)
router.get("/mqtt_two", isAuthorizeRoles("Production", "Support"), getmqttTwoDestination)


module.exports = router;