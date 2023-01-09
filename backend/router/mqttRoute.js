const express = require('express');
const router = express.Router();
const {upload, upload2} = require("../middleware/upload");

const {setmqttOneDestination, getmqttOneDestination, setmqttTwoDestination, getmqttTwoDestination,     fileUploadHandlerOne,   fileUploadHandlerTwo, setmqttOneProtocol, setmqttTwoProtocol, getmqttBrokerStatus, setmqttBrokerStatus, setmqttOneDestinationApply, setmqttOneApplyProtocol, setmqttTwoDestinationApply, setmqttTwoProtocolApply} = require("../controllers/mqttController")

const {isAuthenticated, isAuthorizeRoles} = require("../middleware/is-auth.js");

router.use(isAuthenticated)

router.post("/mqtt_one", isAuthorizeRoles("Production", "Support"), setmqttOneDestination)

//apply
router.post("/mqtt_one_apply", isAuthorizeRoles("Production", "Support"), setmqttOneDestinationApply)

router.get("/mqtt_one", isAuthorizeRoles("Production", "Support"), getmqttOneDestination)
router.post("/mqtt_one_cert_file", isAuthorizeRoles("Production", "Support"),     upload.single("mqtt_cert_file"), fileUploadHandlerOne)

router.post("/mqtt_one_protocol", isAuthorizeRoles("Production", "Support"), setmqttOneProtocol)

//apply
router.post("/mqtt_one_protocol_apply", isAuthorizeRoles("Production", "Support"), setmqttOneApplyProtocol)

router.post("/mqtt_two", isAuthorizeRoles("Production", "Support"), setmqttTwoDestination)

//apply

router.post("/mqtt_two_apply", isAuthorizeRoles("Production", "Support"), setmqttTwoDestinationApply)

router.get("/mqtt_two", isAuthorizeRoles("Production", "Support"), getmqttTwoDestination)
router.post("/mqtt_two_cert_file", isAuthorizeRoles("Production", "Support"),     upload2.single("mqtt_certificate_file_two"), fileUploadHandlerTwo)
router.post("/mqtt_two_protocol", isAuthorizeRoles("Production", "Support"), setmqttTwoProtocol)

// apply
router.post("/mqtt_two_protocol_apply", isAuthorizeRoles("Production", "Support"), setmqttTwoProtocolApply)

router.get("/mqtt_broker_status", isAuthorizeRoles("Production", "Support"), getmqttBrokerStatus)
router.post("/mqtt_broker_status", isAuthorizeRoles("Production", "Support"), setmqttBrokerStatus )

module.exports = router;