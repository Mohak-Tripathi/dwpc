

const express= require('express');
const router= express.Router();

const {   saveInference, getInference,  saveApplyInference } = require("../controllers/inferenceController")

const {isAuthenticated, isAuthorizeRoles} = require("../middleware/is-auth");

router.use(isAuthenticated)

router.post(
    "/dwpc_params", 
    isAuthorizeRoles( "Production"),

    saveInference
  );

  router.post(
    "/dwpc_params_apply", 
    isAuthorizeRoles( "Production"),

    saveApplyInference
  );


  router.get(
    "/dwpc_params", 
    isAuthorizeRoles( "Production"),

    getInference
  );


  


  
module.exports = router;