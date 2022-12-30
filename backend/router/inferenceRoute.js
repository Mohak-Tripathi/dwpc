

const express= require('express');
const router= express.Router();

const {   saveInference, getInference } = require("../controllers/inferenceController")

const {isAuthenticated, isAuthorizeRoles} = require("../middleware/is-auth");

router.use(isAuthenticated)

router.post(
    "/dwpc_params", 
    isAuthorizeRoles( "Production"),

    saveInference
  );


  router.get(
    "/dwpc_params", 
    isAuthorizeRoles( "Production"),

    getInference
  );


  


  
module.exports = router;