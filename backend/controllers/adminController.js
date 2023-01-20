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

    const file = req.file;

  
    if (!file) {
      console.log("file not choosen");
      return res.status(404).json({
        message: "No File Choosen",
      });
    } else {
   
      const fileName =  JSON.parse(fs.readFileSync("./config.json"));
  
      const directoryPath =  path.join(__dirname, "../ota_file" )
    
    
      fs.unlink(directoryPath + "/" + fileName.admin.ota, (err) => {
        if (err) {
   
          console.log(err)
        }
    
      });
  
      const config = JSON.parse(fs.readFileSync("./config.json"));
     
  
      let certPath =  file.originalname;
      //* set the path
      config.admin.ota = certPath;

      fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
      res.status(200).json({
        message: "file upload success",
        filename: file.originalname,
      });
    }
  //   const { otaData } = req.body;

  // if( otaData){
  //   const config = JSON.parse(fs.readFileSync("./config.json"));
  //   config.admin.ota = otaData;
  //   fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
  //   res.status(200).json({
  //     message: "OTA Update set succesfully",
  //   });
  // }
  // else{
  //   res.status(200).json({
  //     message: "OTA Update set failed",
  //   });
  // }

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




// apply logic
exports.setApplyVariant = (req, res, next) => {
  const { variantData } = req.body;

if(variantData){

  // const config = JSON.parse(fs.readFileSync("./config.json"));
  // config.admin.variant = variantData;
  // fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
  res.status(200).json({
    message: "Apply succesfully",
  });
}
else{
  res.status(200).json({
    message: "variant set configuration failed",
  });
}
  
};



exports.changeApModeSsidApply = (req, res, next) => {

  let { ap_mode_ssid } = req.body;

  if (ap_mode_ssid) {

    // const config = JSON.parse(fs.readFileSync("./config.json"));

    // config.admin.ap_mode_ssid = ap_mode_ssid;

    // fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));

    res.status(200).json({
      message: "apMode SSID apply is set",
    });
  }
  else {
    res.status(200).json({
      message: "apMode SSID configration failed",
    });
  }
}


  //apply
exports.changeApModeApplyPassword = (req, res, next) => {

  let { ap_mode_ssid_pass} = req.body;

  if (ap_mode_ssid_pass) {

    // const config = JSON.parse(fs.readFileSync("./config.json"));

    // config.admin.ap_mode_ssid_pass = ap_mode_ssid_pass;

    // fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));

    res.status(200).json({
      message: "apMode SSID Apply password is set",
    });
  }
  else {
    res.status(200).json({
      message: "apMode SSID password configration failed",
    });
  }

};


//apply
// exports.setOtaApplyUpdate = (req, res, next) => {
//   const { otaData } = req.body;

// if( otaData){
//   // const config = JSON.parse(fs.readFileSync("./config.json"));
//   // config.admin.ota = otaData;
//   // fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
//   res.status(200).json({
//     message: "OTA Update Apply set succesfully",
//   });
// }
// else{
//   res.status(200).json({
//     message: "OTA Update set failed",
//   });
// }

// };





    
exports.setWifiStatusApplyUpdate = (req, res, next) => {

  let { wifiStatus} = req.body;

  if ( wifiStatus) {

    // const config = JSON.parse(fs.readFileSync("./config.json"));

    // config.admin.wifi_status = wifiStatus;

    // fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));

    res.status(200).json({
      message: {wifiStatus},
    });
  }
  else {
    res.status(200).json({
      message: "wifi status set configration failed",
    });
  }

};





// exports.dcUpdate = (req, res, next) => {

//   let { dc_data } = req.body;

//   if ( dc_data) {
// console.log(dc_data)

//     res.status(200).json({
//       message: {dc_data}

//     });
//   }
//   else {
//     res.status(200).json({
//       message: "dc_data failed",
//     });
//   }
// }


const fs = require('fs');
const yaml = require('js-yaml');

// Read YAML file
try {
  const fileContents = fs.readFileSync('path/to/file.yml', 'utf8');
  const data = yaml.safeLoad(fileContents);
  console.log(data);
} catch (e) {
  console.log(e);
}

// Write YAML file
const dataToWrite = { key: 'value' };
try {
  const yamlString = yaml.safeDump(dataToWrite);
  fs.writeFileSync('path/to/file.yml', yamlString, 'utf8');
} catch (e) {
  console.log(e);
}


  
  