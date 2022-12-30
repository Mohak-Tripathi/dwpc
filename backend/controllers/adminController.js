const fs = require("fs");
const path = require("path");


exports.getApModeSsid = (req, res, next) => {
    const config = JSON.parse(fs.readFileSync("./config.json"));
    res.status(200).json(config.network_information.ap_mode_ssid);
  };



  exports.changeApModeSsid = (req, res, next) => {

    let { ap_mode_ssid } = req.body;
  
    if (ap_mode_ssid) {
  
      const config = JSON.parse(fs.readFileSync("./config.json"));
  
      config.network_information.ap_mode_ssid = ap_mode_ssid;
  
      fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
  
      res.status(200).json({
        message: "apMode SSID is set",
      });
    }
    else {
      res.status(200).json({
        message: "apMode SSID configration failed",
      });
    }
}

    
  
exports.changeApModePassword = (req, res, next) => {

    let { ap_mode_ssid_pass} = req.body;
  
    if (ap_mode_ssid_pass) {
  
      const config = JSON.parse(fs.readFileSync("./config.json"));
  
      config.network_information.ap_mode_ssid_pass = ap_mode_ssid_pass;
  
      fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
  
      res.status(200).json({
        message: "apMode SSID password is set",
      });
    }
    else {
      res.status(200).json({
        message: "apMode SSID password configration failed",
      });
    }
  
  };

  exports.getVariant = (req, res, next) => {
    const config = JSON.parse(fs.readFileSync("./config.json"));
    res.status(200).json(config.variant);
  };
  

  exports.setVariant = (req, res) => {
    const { variantData } = req.body;

  
    const config = JSON.parse(fs.readFileSync("./config.json"));
    config.variant = variantData;
    fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
    res.status(200).json({
      message: "variant set succesfully",
    });
  };
  