


function getInferenceData(){
  // http://localhost:8080/api/v1/inference/dwpc_params

// let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
    fetch("/rpc/Config.Get", {
		method: 'GET',
		// headers: {
    //   Authorization: `Bearer ${BearerCheck}`,
		// },
	})
  .then((response)=> {
  
    if(response.status === 200){
        return response.json()
    }
    else if(response.status === 401){
      window.location.href="./login.html"
    }
    else{
        alert("something went wrong");
    }})

		.then(response => {
      console.log(response)

      document.getElementById("aggregation-interval").value =  response.dwpc.interval
      document.getElementById("In-zone-distance-threshold").value  =  response.dwpc.distance
      document.getElementById("out-zone-distance-threshold").value  =  response.dwpc.distance
      document.getElementById("room-capacity").value  =  response.dwpc.capacity
      document.getElementById("periodic-reset-interval").value  =  response.dwpc.periodic_reset
      document.getElementById("function-mode").value  =  response.dwpc.function_mode
      document.getElementById("measurement-frequency").value  =  response.dwpc.sensor_freq
      document.getElementById("pixel-count-one-person-threshold").value  =  response.dwpc.Inzonecount_threshold
      document.getElementById("pixel-count-two-person-threshold").value  =  response.dwpc.outzonecount_threshold
      document.getElementById("os-timer-delay").value  =  response.dwpc.os_timer_delay
      document.getElementById("wait-timer").value  =  response.dwpc.wait_timer
      document.getElementById("sensing-mode").value  =  response.dwpc.sensing_mode
    })
		.catch(err => console.error(err));
  }


  getInferenceData()

 


  // function showToast(val){
  //   Toastify({

  //     text: "val",
      
  //     duration: 5000
      
  //     }).showToast();
  
  // }
 






document.getElementById("inference-form").addEventListener("submit", getInferenceForm)


function  getInferenceForm(e){
e.preventDefault()
  let aggregationInterval = document.getElementById("aggregation-interval").value
  let InZoneDistanceThrehold= document.getElementById("In-zone-distance-threshold").value
  let OutZoneDistanceThrehold= document.getElementById("out-zone-distance-threshold").value
  let PeriodicResetInterval= document.getElementById("periodic-reset-interval").value
  let FunctionMode= document.getElementById("function-mode").value
  let MeasurementFrequency = document.getElementById("measurement-frequency").value
  let PixelCountOnePersonThreshold= document.getElementById("pixel-count-one-person-threshold").value
  let PixelCountTwoPersonThreshold= document.getElementById("pixel-count-two-person-threshold").value
  let RoomCapacity= document.getElementById("room-capacity").value
  let OsTimerDelay= document.getElementById("os-timer-delay").value
  let WaitTimer= document.getElementById("wait-timer").value
  let SensingMode= document.getElementById("sensing-mode").value


  var inferenceData = JSON.stringify({
    config:{
      dwpc :{
        "interval": parseInt(aggregationInterval),
        "in_zone_distance_threshold": parseInt(InZoneDistanceThrehold),
        "out_zone_distance_threshold": parseInt(OutZoneDistanceThrehold),
        "capacity": RoomCapacity,
        "periodic_reset":PeriodicResetInterval,
        "function_mode":parseInt(FunctionMode),
        "sensor_freq":  MeasurementFrequency ,
        "Inzonecount_threshold": PixelCountOnePersonThreshold,
        "outzonecount_threshold": PixelCountTwoPersonThreshold,    
        "os_timer_delay": OsTimerDelay,
      "wait_timer": WaitTimer,
      "sensing_mode": SensingMode
    },
    },
    });
    
  // let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
    fetch("/rpc/Config.Set", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json"
        },
        body: inferenceData
    })
    .then((res)=> {
  
    if(res.status === 200){
 
    
    return res.json()

  
    }
    else if(res.status === 401){
      window.location.href="./login.html"
    }
    else{
        alert("something went wrong")  ;
    }})
    .then((data)=>{
      console.log(data) 

    })
    .catch(err => console.log(err))


    }


    

// document.getElementById("inference-apply-button").addEventListener("click", getInferenceApplyForm)


// function  getInferenceApplyForm(){

//   let aggregationInterval = document.getElementById("aggregation-interval").value
//   let InZoneDistanceThreshold= document.getElementById("In-zone-distance-threshold").value
//   let OutZoneDistanceThreshold= document.getElementById("out-zone-distance-threshold").value
//   let PeriodicResetInterval= document.getElementById("periodic-reset-interval").value
//   let FunctionMode= document.getElementById("function-mode").value
//   let MeasurementFrequency = document.getElementById("measurement-frequency").value
//   let PixelCountOnePersonThreshold= document.getElementById("pixel-count-one-person-threshold").value
//   let PixelCountTwoPersonThreshold= document.getElementById("pixel-count-two-person-threshold").value
//   let RoomCapacity= document.getElementById("room-capacity").value
//   let OsTimerDelay= document.getElementById("os-timer-delay").value
//   let WaitTimer= document.getElementById("wait-timer").value
//   let SensingMode= document.getElementById("sensing-mode").value


// var inferenceApplyData = JSON.stringify({
//     "aggregation_interval":  aggregationInterval,
//     "in_zone_distance_threshold": InZoneDistanceThreshold,
//     "out_zone_distance_threshold": OutZoneDistanceThreshold,
//     "periodic_reset_interval":PeriodicResetInterval,
//     "function_mode":FunctionMode,
//     "measurement_frequency":  MeasurementFrequency ,
//     "pixel_count_one_person_threshold": PixelCountOnePersonThreshold,
//     "pixel_count_two_person_threshold": PixelCountTwoPersonThreshold,
//     "room_capacity": RoomCapacity,
//     "os_timer_delay": OsTimerDelay,
//     "wait_timer": WaitTimer,
//     "sensing_mode": SensingMode
//   });

//   let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
//     fetch("http://localhost:8080/api/v1/inference/dwpc_params_apply", {
//         method: "POST",
//         headers: {
//             "Accept": "application/json, text/plain, */*",
//             "Content-type": "application/json",
//             Authorization: `Bearer ${BearerCheck}`,
//         },
//         body: inferenceApplyData
//     })
//     .then((res)=> {
//     if(res.status === 200){
//         return res.json()
//     }
//     else if(res.status === 401){
//       window.location.href="../login/login.html"
//     }
//     else{
//         alert("something went wrong")  ;
//     }})
//     .then((data)=>{
//       console.log(data)  
//     })
//     .catch(err => console.log(err))


//     }




//     const nav= document.querySelector(".nav")
// fetch("../Components/stylesheetlinks.html")
// .then(res=> res.text())
// .then(data=> {
//     nav.innerHTML = data;
// })
