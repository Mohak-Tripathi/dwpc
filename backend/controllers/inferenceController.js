

const fs = require("fs");
const path = require("path");

exports.saveInference = (req, res, next) => {
  
    const {
  aggregation_interval,
  in_zone_distance_threhold,
  out_zone_istance_threhold,
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
    config.inference.in_zone_distance_threhold = parseFloat(in_zone_distance_threhold,);
    config.inference.out_zone_istance_threhold = parseInt(out_zone_istance_threhold);
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


  exports.getInference = (req, res, next) => {
    const config = JSON.parse(fs.readFileSync("./config.json"));
    res.status(200).json(config.inference);
  };
  