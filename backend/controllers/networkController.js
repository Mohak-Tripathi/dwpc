
const fs = require("fs");
const path = require("path");
const yaml = require('js-yaml');

exports.getNetworkInfo = (req, res, next) => {
  const config = JSON.parse(fs.readFileSync("./config.json"));
  res.status(200).json(config.network_information);
};


exports.changeNtpServer= (req, res, next) => {
    const { ntpServer } = req.body;
  
    const config = JSON.parse(fs.readFileSync("./config.json"));
    config.network_information.ntp_server = ntpServer;
    fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
    res.status(200).json({
      message: "Ntp Server set succesfully",
    });
  };


  // exports.staticIpEtherent = (req, res, next) => {

  //   const {
  //     static_ip_ethernet,
  //     gateway_ip_ethernet
  //   } = req.body;
  
  //   const config = JSON.parse(fs.readFileSync("./config.json"));
  
  //   config.network_information.static_ip_eth = static_ip_ethernet;
  //   config.network_information.static_ip_eth_pass = gateway_ip_ethernet
  
  //   fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
  //   res.status(200).json({ message: "static ip ethernet is saved" });
  // };


  exports.wifiCredentials = (req, res, next) => {

    const {
      SSID,
      password
    } = req.body;
  

  
    const config = JSON.parse(fs.readFileSync("./config.json"));
  
    config.network_information.wifi_cred_ssid = SSID;
    config.network_information.wifi_cred_pass = password;
  
    fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
    res.status(200).json({ message: "wifi credentials saved" });
  };


  
exports.staticIpWifi = (req, res, next) => {

  const {
    static_ip,
    gateway_ip
  } = req.body;


  const config = JSON.parse(fs.readFileSync("./config.json"));

  config.network_information.static_ip = static_ip;
  config.network_information.static_ip_gateway = gateway_ip

  fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
  res.status(200).json({ message: "static ip wifi is saved" });
};


exports.getNtpServer = (req, res, next) => {
  const config = JSON.parse(fs.readFileSync("./config.json"));
  res.status(200).json(config.network_information.ntp_server);
};




//apply 


exports.wifiCredentialsApply = (req, res, next) => {

  try {
    const directoryPath =  path.join(__dirname, "./mos.yaml" )

    console.log(directoryPath, "ko")
    const fileContents = fs.readFileSync(directoryPath, 'utf8');
    const data = yaml.load(fileContents);
    console.log(data);
  
    // data.customer.first_name= "shara2"
    // const yamlString = yaml.dump(data);
    // console.log(yamlString, "kokok")
    // fs.writeFileSync(directoryPath , yamlString, 'utf8');
  } catch (e) {
    console.log(e);
  }
  
};


//apply
  
exports.staticIpWifiApply = (req, res, next) => {

  const {
    static_ip,
    gateway_ip
  } = req.body;

  // const config = JSON.parse(fs.readFileSync("./config.json"));

  // config.network_information.static_ip_wifi = static_ip;
  // config.network_information.static_ip_wifi_pass = gateway_ip

  // fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
  res.status(200).json({ message: "static ip wifi Apply is saved" });
};

//apply 


// exports.staticIpEtherentApply = (req, res, next) => {

//   const {
//     static_ip_ethernet,
//     gateway_ip_ethernet
//   } = req.body;

//   // const config = JSON.parse(fs.readFileSync("./config.json"));

//   // config.network_information.static_ip_eth = static_ip_ethernet;
//   // config.network_information.static_ip_eth_pass = gateway_ip_ethernet

//   // fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
//   res.status(200).json({ message: "static ip ethernet Apply is saved" });
// };

//apply 


exports.changeNtpServerApply= (req, res, next) => {
  const { ntpServer } = req.body;

  // const config = JSON.parse(fs.readFileSync("./config.json"));
  // config.network_information.ntp_server = ntpServer;
  // fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
  res.status(200).json({
    message: "Ntp Server Apply set succesfully",
  });
};








