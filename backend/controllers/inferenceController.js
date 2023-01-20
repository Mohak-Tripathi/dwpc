

const fs = require("fs");
const path = require("path");
const yaml = require('js-yaml');

exports.saveInference = (req, res, next) => {
  
    const {
  aggregation_interval,
  in_zone_distance_threshold,
  out_zone_distance_threshold,
  periodic_reset_interval,
  function_mode,
  measurement_frequency,
  pixel_count_one_person_threshold,
  pixel_count_two_person_threshold,
  room_capacity,
  os_timer_delay,
  wait_timer,
  sensing_mode
  
  
    } = req.body;
    const config = JSON.parse(fs.readFileSync("./config.json"));
    
    config.inference.aggregation_interval = parseInt(aggregation_interval );
    config.inference.in_zone_distance_threshold = parseFloat(in_zone_distance_threshold,);
    config.inference.out_zone_distance_threshold = parseInt(out_zone_distance_threshold);
    config.inference.periodic_reset_interval = parseInt(periodic_reset_interval);
    config.inference.function_mode = parseInt(function_mode);
    config.inference.measurement_frequency = parseInt(measurement_frequency);
    config.inference.pixel_count_one_person_threshold = parseFloat(pixel_count_one_person_threshold);
    config.inference.pixel_count_two_person_threshold = parseFloat(pixel_count_two_person_threshold);
    config.inference.room_capacity = parseFloat(room_capacity);
    config.inference.os_timer_delay= parseFloat(os_timer_delay);
    config.inference.wait_timer = parseFloat(wait_timer);
    config.inference.sensing_mode = parseFloat(sensing_mode);

    fs.writeFileSync("./config.json", JSON.stringify(config, null, "\t"));
    res.status(200).json({ message: "Inference params saved" });
  };


  //apply

  exports.saveApplyInference = (req, res, next) => {
  
    try {
      const fileContents = fs.readFileSync('data.yaml', 'utf8');
      const data = yaml.load(fileContents);
      console.log(data);
      // data.config_schema.map(()=>{
      //   if()
      // })

      data.config_schema[5][1]= "shara"
      const yamlString = yaml.dump(data);
      fs.writeFileSync('data.yaml', yamlString, 'utf8');
    } catch (e) {
      console.log(e);
    }
    
  

  };

  exports.getInference = (req, res, next) => {
    const config = JSON.parse(fs.readFileSync("./config.json"));
    res.status(200).json(config.inference);
  };
  


  
