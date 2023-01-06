

const express= require('express');
const router= express.Router();

const {getDashboardInfo} = require("../controllers/dashboardController")

const {isAuthenticated, isAuthorizeRoles} = require("../middleware/is-auth.js");

router.use(isAuthenticated)


router.get("/data", getDashboardInfo);


  module.exports = router