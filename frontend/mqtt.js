
function getMqttData(){

    
        fetch("/rpc/Config.Get", {
            method: 'GET',
          //   headers: {
          // Authorization: `Bearer ${BearerCheck}`,
          //   },
        })
        .then((response)=> {
  
          if(response.status === 200){
              return response.json()
          }
          else if(response.status === 401){
            window.location.href="./login.html"
          }
          else{
              alert("something went wrong")  ;
          }})
            .then(response => {
          // console.log(response)
    console.log(response.mqtt.pass, "kl")

            document.getElementById("mqtt-broker").value = response.mqtt.server
            document.getElementById("mqtt-port").value = response.mqtt.port
            document.getElementById("mqtt-people-count").value = response.mqtt.pub
            document.getElementById("response-1").value = response.mqtt.sub
            document.getElementById("mqtt-protocol").value = response.mqtt.protocol
            document.getElementById("mqtt-device-health").value = response.mqtt.device_health
           document.getElementById("mqtt-user-name").value = response.mqtt.user
            document.getElementById("mqtt-user-password").value = response.mqtt.pass
            // document.getElementById("mqtt-cert").value = response.mqtt.ca


            if(response.mqtt_protocol === "TCP"){
              document.getElementById("display-mqtt-1").style.display="none"
           
            }


       

        })
            .catch(err => console.error(err));
      }
    
    
      getMqttData()



      // function getMqttBrokerStatus(){


      //   let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
      //       fetch("http://localhost:8080/api/v1/mqtt/mqtt_broker_status", {
      //           method: 'GET',
      //           headers: {
      //         Authorization: `Bearer ${BearerCheck}`,
      //           },
      //       })
      //           .then(response => response.json())
      //           .then(response => {
      //         console.log(response)
        
      //         document.getElementById("mqtt-data").value =  response

    
      //       })
      //           .catch(err => console.error(err));
      //     }
        
        
      //     getMqttBrokerStatus()




// document.getElementById("mqtt-button").addEventListener("click", setMqttValue)


// function setMqttValue(){
//     let mqttBrokerValue =   document.getElementById("mqtt-data").value


//     var mqttBrokerSelection = JSON.stringify({
//         "mqttStatus":  mqttBrokerValue
//       });

//       let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


//     fetch("http://localhost:8080/api/v1/mqtt/mqtt_broker_status", {
//         method: "POST",
//         headers: {
//             "Accept": "application/json, text/plain, */*",
//             "Content-type": "application/json",
//         Authorization: `Bearer ${BearerCheck}`,

//         },
//         body: mqttBrokerSelection
//     })
//     .then((res)=> {
//     if(res.status === 200){
//         window.location.href="mqtttwo.html"
//         return res.json()

//     }else{
//         alert("something went wrong")  ;
//     }})
//     .then((data)=>{
//       console.log(data) 
//     })
//     .catch(err => console.log(err))

// }


document.getElementById("mqtt-form").addEventListener("submit",  setMqttBrokerOneForm)


function  setMqttBrokerOneForm(e){
e.preventDefault()
  let mqttBroker = document.getElementById("mqtt-broker").value
  let mqttPort= document.getElementById("mqtt-port").value
  let mqttPeopleCount= document.getElementById("mqtt-people-count").value
  let mqttDeviceHealth= document.getElementById("mqtt-device-health").value
  let mqttUserName= document.getElementById("mqtt-user-name").value
  let mqttUserPassword = document.getElementById("mqtt-user-password").value
  let mqttResponse = document.getElementById("response-1").value


var mqttBrokerOneData = JSON.stringify({
  config:{
    mqtt: {
      "server": mqttBroker,
      "port":  mqttPort,
      "pub": mqttPeopleCount,
      "device_health": mqttDeviceHealth,
      "user": mqttUserName,
      "pass": mqttUserPassword,
      "sub" : mqttResponse
    }
  }
 
  });

  // let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
    fetch("/rpc/Config.Set", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json"
            // Authorization: `Bearer ${BearerCheck}`,
        },
        body: mqttBrokerOneData
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

      
      let new_data = JSON.stringify({ reboot: true })
      fetch("/rpc/Config.Save", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json"
        },
        body: new_data 

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
        alert("MQTT  parameter is set sucessfully");
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))


    }




//     document.getElementById("mqtt-protocol-button").addEventListener("click", setMqttProtocolStatus)

// function setMqttProtocolStatus(){

//     let mqttProtocol =   document.getElementById("mqtt-protocol").value

  
//     var mqttProtocolSelection = JSON.stringify({
//       config:{
//         mqtt:{
//           "protocol" :  mqttProtocol 
//         }
//       }
      
//       });

//       // let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


//     fetch("/rpc/Config.Set", {
//         method: "POST",
//         headers: {
//             "Accept": "application/json, text/plain, */*",
//             "Content-type": "application/json",
//         // Authorization: `Bearer ${BearerCheck}`,

//         },
//         body: mqttProtocolSelection
//     })
//     .then((res)=> {

//     if(res.status === 200){
//      return res.json()
//     }
//     else if(res.status === 401){
//       window.location.href="./login.html"
//     }
//     else{
//         alert("something went wrong")  ;
//     }})
//     .then((data)=>{
   
//       // console.log(data) 
      
//       let new_data = JSON.stringify({ reboot: true })
//       fetch("/rpc/Config.Save", {
//         method: "POST",
//         headers: {
//             "Accept": "application/json, text/plain, */*",
//             "Content-type": "application/json"
//         },
//         body: new_data 

//     })
//     .then((res)=> {
//       if(res.status === 200){
//       return res.json()
//       }
//       else if(res.status === 401){
//         window.location.href="./login.html"
//       }
//       else{
//           alert("something went wrong")  ;
//       }})
//       .then((data)=>{
//         console.log(data) 
//         alert("Mqtt Protocol status is set sucessfully");
//       })
//       .catch(err => console.log(err))
//     })
//     .catch(err => console.log(err))

// }





document.getElementById("upload-cert-button").addEventListener("click",  setMqttProtocolCert)


function  setMqttProtocolCert(){
  var formdata = new FormData();
  formdata.append("mqtt_cert_file", mqtt_cert_file.files[0]);
  

  // let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
  var requestOptions = {
    method: 'POST',
    body: formdata,
  //   headers: {
  //   //   "Accept": "application/json, */*",
  //   // "Content-Type": "text/html; charset=utf-8",
  
  // Authorization: `Bearer ${BearerCheck}`,
  
  // }
  };
  
  fetch("/rpc/FS.Put", requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));


.then((res)=> {
    if(res.status === 200){  
        return res.text()
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



//APPLY 

//     document.getElementById("mqtt-one-button").addEventListener("click",  setMqttBrokerOneApplyForm)


// function  setMqttBrokerOneApplyForm(){

//   let mqttBroker = document.getElementById("mqtt-broker").value
//   let mqttPort= document.getElementById("mqtt-port").value
//   let mqttPeopleCount= document.getElementById("mqtt-people-count").value
//   let mqttDeviceHealth= document.getElementById("mqtt-device-health").value
//   let mqttUserName= document.getElementById("mqtt-user-name").value
//   let mqttUserPassword = document.getElementById("mqtt-user-password").value
//   let mqttResponse = document.getElementById("response-1").value


// // console.log(aggregationInterval, InZoneDistanceThrehold )

// var mqttBrokerOneApplyData = JSON.stringify({
//     "broker": mqttBroker,
//     "port":  mqttPort,
//     "people_count_topic": mqttPeopleCount,
//     "device_health_topic": mqttDeviceHealth,
//     "mqtt_user_name": mqttUserName,
//     "mqtt_password": mqttUserPassword,
//     "response_time" : mqttResponse
//   });

//   let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
//     fetch("http://localhost:8080/api/v1/mqtt/mqtt_one_apply", {
//         method: "POST",
//         headers: {
//             "Accept": "application/json, text/plain, */*",
//             "Content-type": "application/json",
//             Authorization: `Bearer ${BearerCheck}`,
//         },
//         body: mqttBrokerOneApplyData
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



    //apply 

    
//     document.getElementById("mqtt-protocol-apply-button").addEventListener("click", setMqttProtocolApplyStatus)

// function setMqttProtocolApplyStatus(){

//     let mqttProtocolApply =   document.getElementById("mqtt-protocol").value

  
//     var mqttProtocolSelection = JSON.stringify({
//         "mqttProtocolOne" :  mqttProtocolApply 
//       });

//       let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


//     fetch("http://localhost:8080/api/v1/mqtt/mqtt_one_protocol_apply", {
//         method: "POST",
//         headers: {
//             "Accept": "application/json, text/plain, */*",
//             "Content-type": "application/json",
//         Authorization: `Bearer ${BearerCheck}`,

//         },
//         body: mqttProtocolSelection
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

// }











    