const fs = require("fs");
const path = require("path");


exports.calliberate = (req, res, next) => {

    let { calliberate } = req.body;
  
    if (calliberate) {

      res.status(200).json({
        message: "calliberate configuration is successful",
      });
    }
    else {
      res.status(200).json({
        message: "calliberate configuration has failed",
      });
    }
  };




exports.factoryReset= (req, res, next) => {

    let { factoryReset } = req.body;
  
    if (factoryReset) {

      res.status(200).json({
        message: "factory reset is successful",
      });
    }
    else {
      res.status(200).json({
        message: "factory reset failed",
      });
    }
}

exports.reboot= (req, res, next) => {

    let { reboot } = req.body;
  
    if ( reboot) {

      res.status(200).json({
        message: "reboot is successful",
      });
    }
    else {
      res.status(200).json({
        message: "reboot failed",
      });
    }
}

