const express = require('express');
const router = express.Router();
const {upload, upload2} = require("../middleware/upload");

const {setmqttOneDestination, getmqttOneDestination, setmqttTwoDestination, getmqttTwoDestination,     fileUploadHandlerOne,   fileUploadHandlerTwo, setmqttOneProtocol, setmqttTwoProtocol} = require("../controllers/mqttController")

const {isAuthenticated, isAuthorizeRoles} = require("../middleware/is-auth.js");

router.use(isAuthenticated)

router.post("/mqtt_one", isAuthorizeRoles("Production", "Support"), setmqttOneDestination)
router.get("/mqtt_one", isAuthorizeRoles("Production", "Support"), getmqttOneDestination)
router.post("/mqtt_one_cert_file", isAuthorizeRoles("Production", "Support"),     upload.single("mqtt_cert_file"), fileUploadHandlerOne)
router.post("/mqtt_one_protocol", isAuthorizeRoles("Production", "Support"), setmqttOneProtocol)

router.post("/mqtt_two", isAuthorizeRoles("Production", "Support"), setmqttTwoDestination)
router.get("/mqtt_two", isAuthorizeRoles("Production", "Support"), getmqttTwoDestination)
router.post("/mqtt_two_cert_file", isAuthorizeRoles("Production", "Support"),     upload2.single("mqtt_certificate_file_two"), fileUploadHandlerTwo)
router.post("/mqtt_two_protocol", isAuthorizeRoles("Production", "Support"), setmqttTwoProtocol)

module.exports = router;