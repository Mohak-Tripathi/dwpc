const express= require('express');
const router= express.Router();

const {login} = require("../controllers/authController")

// const {isAuthenticated} = require("../middlewares/auth");



// router.use(isAuthenticated) // becz we were using isAuthenticated in every route. So we used use. And remove "isAuthenticated" from every route"


router.route("/login").post(login);   // if authenticated will not be written it will throw error, can not read the property of undefined becz in authentication only we are attaching userid. 




module.exports = router;