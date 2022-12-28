const express= require('express');
const router= express.Router();

const {login, logout} = require("../controllers/authController")

const {isAuthenticated} = require("../middleware/is-auth.js");


// router.use(isAuthenticated) // becz we were using isAuthenticated in every route. So we used use. And remove "isAuthenticated" from every route"


router.post("/login", login);   // if authenticated will not be written it will throw error, can not read the property of undefined becz in authentication only we are attaching userid. 

router.get("/logout", isAuthenticated, logout)


module.exports = router;