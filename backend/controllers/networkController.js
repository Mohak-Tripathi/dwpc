
const fs = require("fs");
const path = require("path");



exports.changeNtpServer= (req, res, next) => {
    const { ntpServer } = req.body;
  
    const config = JSON.parse(fs.readFileSync("./config.json"));
    config.ntp_server = ntpServer;
    fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
    res.status(200).json({
      message: "Ntp Server set succesfully",
    });
  };


  exports.staticIpEtherent = (req, res, next) => {

    const {
      static_ip_ethernet,
      gateway_ip_ethernet
    } = req.body;
  
    // console.log( static_ip_ethernet, gateway_ip_ethernet, "ha")
  
    const config = JSON.parse(fs.readFileSync("./config.json"));
  
    config.network_information.static_ip_eth = static_ip_ethernet;
    config.network_information.static_ip_eth_pass = gateway_ip_ethernet
  
    fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
    res.status(200).json({ message: "static ip ethernet is saved" });
  };


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