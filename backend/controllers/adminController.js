const fs = require("fs");
const path = require("path");


// exports.getApModeSsid = (req, res, next) => {
//     const config = JSON.parse(fs.readFileSync("./config.json"));
//     res.status(200).json(config.admin.ap_mode_ssid);
//   };

  exports.getAdminInfo = (req, res, next) => {
    const config = JSON.parse(fs.readFileSync("./config.json"));
    res.status(200).json(config.admin);
  };




  exports.changeApModeSsid = (req, res, next) => {

    let { ap_mode_ssid } = req.body;
  
    if (ap_mode_ssid) {
  
      const config = JSON.parse(fs.readFileSync("./config.json"));
  
      config.admin.ap_mode_ssid = ap_mode_ssid;
  
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
  
      config.admin.ap_mode_ssid_pass = ap_mode_ssid_pass;
  
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

  // exports.getVariant = (req, res, next) => {
  //   const config = JSON.parse(fs.readFileSync("./config.json"));
  //   res.status(200).json(config.admin.variant);
  // };
  

  exports.setVariant = (req, res, next) => {
    const { variantData } = req.body;

  if(variantData){
    const config = JSON.parse(fs.readFileSync("./config.json"));
    config.admin.variant = variantData;
    fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
    res.status(200).json({
      message: "variant set succesfully",
    });
  }
  else{
    res.status(200).json({
      message: "variant set configuration failed",
    });
  }
    
  };
  

  
  exports.setOtaUpdate = (req, res, next) => {
    const { otaData } = req.body;

  if( otaData){
    const config = JSON.parse(fs.readFileSync("./config.json"));
    config.admin.ota = otaData;
    fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
    res.status(200).json({
      message: "OTA Update set succesfully",
    });
  }
  else{
    res.status(200).json({
      message: "OTA Update set failed",
    });
  }

  };

  
  // exports.getOtaUpdate = (req, res, next) => {
  //   const config = JSON.parse(fs.readFileSync("./config.json"));
  //   res.status(200).json(config.admin.ota);
  // };



    
exports.setWifiStatusUpdate = (req, res, next) => {

  let { wifiStatus} = req.body;

  if ( wifiStatus) {

    const config = JSON.parse(fs.readFileSync("./config.json"));

    config.admin.wifi_status = wifiStatus;

    fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));

    res.status(200).json({
      message: "wifi status is set",
    });
  }
  else {
    res.status(200).json({
      message: "wifi status set configration failed",
    });
  }

};

// exports.getWifiStatusUpdate= (req, res, next) => {
//   const config = JSON.parse(fs.readFileSync("./config.json"));
//   res.status(200).json(config.admin.wifi_status);
// };


  
  