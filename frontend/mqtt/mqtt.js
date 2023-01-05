


// function getMqttData(){


//     let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
//         fetch("http://localhost:8080/api/v1/mqtt/mqtt_one", {
//             method: 'GET',
//             headers: {
//           Authorization: `Bearer ${BearerCheck}`,
//             },
//         })
//             .then(response => response.json())
//             .then(response => {
//           console.log(response)
    
//           document.getElementById("aggregation-interval").value =  response.aggregation_interval
//           document.getElementById("In-zone-distance-threhold").value  =  response.in_zone_distance_threhold
//           document.getElementById("out-zone-distance-threhold").value  =  response.out_zone_istance_threhold

//         })
//             .catch(err => console.error(err));
//       }
    
    
//       getMqttData()




document.getElementById("mqtt-button").addEventListener("click", setMqttValue)


function setMqttValue(){
    let mqttBrokerValue =   document.getElementById("mqtt-data").value

    console.log("hello" , mqttBrokerValue)

    var mqttBrokerSelection = JSON.stringify({
        "mqttStatus":  mqttBrokerValue
      });

      let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


    fetch("http://localhost:8080/api/v1/mqtt/mqtt_broker_status", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json",
        Authorization: `Bearer ${BearerCheck}`,

        },
        body: mqttBrokerSelection
    })
    .then((res)=> {
    if(res.status === 200){
        return res.json()
    }else{
        alert("something went wrong")  ;
    }})
    .then((data)=>{
      console.log(data) 
    })
    .catch(err => console.log(err))

}


document.getElementById("mqtt-form").addEventListener("submit",  setMqttBrokerOneForm)


function  setMqttBrokerOneForm(e){
e.preventDefault()
  let mqttBroker = document.getElementById("mqtt-broker").value
  let mqttPort= document.getElementById("mqtt-port").value
  let mqttPeopleCount= document.getElementById("mqtt-people-count").value
  let mqttDeviceHealth= document.getElementById("mqtt-device-health").value
  let mqttUserName= document.getElementById("mqtt-user-name").value
  let mqttUserPassword = document.getElementById("mqtt-user-password").value


// console.log(aggregationInterval, InZoneDistanceThrehold )

var mqttBrokerOneData = JSON.stringify({
    "broker": mqttBroker,
    "port":  mqttPort,
    "people_count_topic": mqttPeopleCount,
    "device_health_topic": mqttDeviceHealth,
    "mqtt_user_name": mqttUserName,
    "mqtt_password": mqttUserPassword
  });

  let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
    fetch("http://localhost:8080/api/v1/mqtt/mqtt_one", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json",
            Authorization: `Bearer ${BearerCheck}`,
        },
        body: mqttBrokerOneData
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