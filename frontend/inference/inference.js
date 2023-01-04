
document.getElementById("inference-form").addEventListener("submit", getInferenceForm)


function  getInferenceForm(e){
e.preventDefault()
  let aggregationInterval = document.getElementById("aggregation-interval").value
  let InZoneDistanceThrehold= document.getElementById("In-zone-distance-threhold").value
  let OutZoneDistanceThrehold= document.getElementById("out-zone-distance-threhold").value
  let PeriodicResetInterval= document.getElementById("periodic-reset-interval").value
  let FunctionMode= document.getElementById("function-mode").value
  let MeasurementFrequency = document.getElementById("measurement-frequency").value
  let PixelCountOnePersonThreshold= document.getElementById("pixel-count-one-person-threshold").value
  let PixelCountTwoPersonThreshold= document.getElementById("pixel-count-two-person-threshold").value
  let RoomCapacity= document.getElementById("room-capacity").value
  let OsTimerDelay= document.getElementById("os-timer-delay").value
  let WaitTimer= document.getElementById("wait-timer").value
  let SensingMode= document.getElementById("sensing-mode").value

// console.log(aggregationInterval, InZoneDistanceThrehold )

var inferenceData = JSON.stringify({
    "aggregation_interval":  aggregationInterval,
    "in_zone_distance_threhold": InZoneDistanceThrehold,
    "out_zone_istance_threhold": OutZoneDistanceThrehold,
    "periodic_reset_interval":PeriodicResetInterval,
    "function_mode":FunctionMode,
    "measurement_frequency":  MeasurementFrequency ,
    "pixel_count_one_person_threshold": PixelCountOnePersonThreshold,
    "pixel_count_two_person_threshold": PixelCountTwoPersonThreshold,
    "room_capacity": RoomCapacity,
    "os_timer_delay": OsTimerDelay,
    "wait_timer": WaitTimer,
    "sensing_mode": SensingMode
  });

  let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
    fetch("http://localhost:8080/api/v1/inference/dwpc_params", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json",
            Authorization: `Bearer ${BearerCheck}`,
        },
        body: inferenceData
    })
    .then((res)=> {
    if(res.status === 200){
        return res.json()
    }else{
        alert("username and password does not match")  ;
    }})
    .then((data)=>{
      console.log(data)  
    })
    .catch(err => console.log(err))


    }
