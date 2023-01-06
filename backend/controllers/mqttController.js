const fs = require("fs");
const path = require("path");

exports.setmqttOneDestination = (req, res, next) => {
  
    const {
broker,
port,
people_count_topic,
device_health_topic,
mqtt_user_name,
mqtt_password,
response_time
  
    } = req.body;
    const config = JSON.parse(fs.readFileSync("./config.json"));
    
    config.mqtt_broker_one.broker = broker;
    config.mqtt_broker_one.port = port;
    config.mqtt_broker_one.people_count_topic= people_count_topic;
    config.mqtt_broker_one.device_health_topic = device_health_topic;
    config.mqtt_broker_one.mqtt_user_name =mqtt_user_name;
    config.mqtt_broker_one.mqtt_password = mqtt_password;
    config.mqtt_broker_one.response_time = response_time;

    fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
    res.status(200).json({ message: "mqtt destination one params saved" });
  };


  exports.getmqttOneDestination = (req, res, next) => {
    const config = JSON.parse(fs.readFileSync("./config.json"));
    res.status(200).json(config.mqtt_broker_one);
  };
  


  exports.setmqttTwoDestination = (req, res, next) => {
  
    const {
broker,
port,
people_count_topic,
device_health_topic,
mqtt_user_name,
mqtt_password,
response_time
  
    } = req.body;
    const config = JSON.parse(fs.readFileSync("./config.json"));
    
    config.mqtt_broker_two.broker = broker;
    config.mqtt_broker_two.port = port;
    config.mqtt_broker_two.people_count_topic= people_count_topic;
    config.mqtt_broker_two.device_health_topic = device_health_topic;
    config.mqtt_broker_two.mqtt_user_name =mqtt_user_name;
    config.mqtt_broker_two.mqtt_password = mqtt_password;
    config.mqtt_broker_two.response_time = response_time;

    fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
    res.status(200).json({ message: "mqtt destination two params saved" });
  };


  exports.getmqttTwoDestination = (req, res, next) => {
    const config = JSON.parse(fs.readFileSync("./config.json"));
    res.status(200).json(config.mqtt_broker_two);
  };


  exports.fileUploadHandlerOne = (req, res, next) => {

    const file = req.file;
  
    if (!file) {
      console.log("file not choosen");
      return res.status(404).json({
        message: "No File Choosen",
      });
    } else {
   
      const fileName =  JSON.parse(fs.readFileSync("./config.json"));
  
     
      const directoryPath =  path.join(__dirname, "../mqtt_certs" )
    
    
      fs.unlink(directoryPath + "/" + fileName.mqtt_broker_one.ca, (err) => {
        if (err) {
          // res.status(500).send({
          //   message: "Could not delete the file. " + err,
          // });
          console.log(err)
        }
    
      });
  
      const config = JSON.parse(fs.readFileSync("./config.json"));
     
  
      let certPath =  file.originalname;
      //* set the path
      config.mqtt_broker_one.ca = certPath;

      fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
      res.status(200).json({
        message: "file upload success",
        filename: file.originalname,
      });
    }
  };


  exports.fileUploadHandlerTwo = (req, res, next) => {

    const file = req.file;
  
    if (!file) {
      console.log("file not choosen");
      return res.status(404).json({
        message: "No File Choosen",
      });
    } else {
   
      const fileName =  JSON.parse(fs.readFileSync("./config.json"));
  
     
      const directoryPath =  path.join(__dirname, "../mqtt_certs_sec" )
    
    
      fs.unlink(directoryPath + "/" + fileName.mqtt_broker_two.ca, (err) => {
        if (err) {
          // res.status(500).send({
          //   message: "Could not delete the file. " + err,
          // });
          console.log(err)
        }
    
      });
  
      const config = JSON.parse(fs.readFileSync("./config.json"));
     
  
      let certPath =  file.originalname;
      //* set the path
      config.mqtt_broker_two.ca = certPath;

      fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
      res.status(200).json({
        message: "file upload success",
        filename: file.originalname,
      });
    }
  };


  exports.setmqttOneProtocol = (req, res, next) => {

    let { mqttProtocolOne} = req.body;
  
    if ( mqttProtocolOne) {
  
      const config = JSON.parse(fs.readFileSync("./config.json"));
      config.mqtt_broker_one.mqtt_protocol = mqttProtocolOne;
  
      fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
  
      res.status(200).json({
        message: "protocol for broker one has set"
      });
    }
    else {
      res.status(200).json({
        message: "protocol for broker one has failed"
      });
    }
  
  };


  
  exports.setmqttTwoProtocol = (req, res, next) => {

    let { mqttProtocolTwo} = req.body;
  
    if ( mqttProtocolTwo) {
  
      const config = JSON.parse(fs.readFileSync("./config.json"));
      config.mqtt_broker_two.mqtt_protocol = mqttProtocolTwo;
  
      fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
  
      res.status(200).json({
        message: "protocol for broker two has set"
      });
    }
    else {
      res.status(200).json({
        message: "protocol for broker two has failed"
      });
    }
  
  };

  exports.setmqttBrokerStatus = (req, res, next) => {

    let { mqttStatus} = req.body;
  
    if ( mqttStatus) {
  
      const config = JSON.parse(fs.readFileSync("./config.json"));
      config.mqtt_broker_status = mqttStatus;
  
      fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
  
      res.status(200).json({
        message: "mqtt broker status has set"
      });
    }
    else {
      res.status(200).json({
        message: "mqtt broker status has failed"
      });
    }
  
  };



  exports.getmqttBrokerStatus = (req, res, next) => {
    const config = JSON.parse(fs.readFileSync("./config.json"));
    res.status(200).json(config.mqtt_broker_status);
  };
  



   