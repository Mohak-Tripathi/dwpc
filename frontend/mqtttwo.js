
function getMqttDataTwo(){

    // let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
        fetch("/rpc/Config.Get", {
            method: 'GET'
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

  
            document.getElementById("mqtt-broker-2").value = response.mqtt1.server   //broker
            document.getElementById("mqtt-port-2").value = response.mqtt1.port
            document.getElementById("mqtt-people-count-2").value = response.mqtt1.pub
             document.getElementById("mqtt-device-health-2").value = response.mqtt1.device_health
           document.getElementById("mqtt-user-name-2").value = response.mqtt1.user
            document.getElementById("mqtt-user-password-2").value = response.mqtt1.pass
            document.getElementById("mqtt-protocol-2").value = response.mqtt1.protocol
            // document.getElementById("mqtt-cert-2").value = response.mqtt1.ca
            document.getElementById("response-2").value = response.mqtt1.sub
    

            if(response.mqtt_protocol === "TCP"){
              document.getElementById("display-mqtt").style.display="none"
           
            }

       

        })
            .catch(err => console.error(err));
      }
    
    
      getMqttDataTwo()


    //   function getMqttBrokerStatusTwo(){


    //     let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
    //         fetch("http://localhost:8080/api/v1/mqtt/mqtt_broker_status", {
    //             method: 'GET',
    //             headers: {
    //           Authorization: `Bearer ${BearerCheck}`,
    //             },
    //         })
    //             .then(response => response.json())
    //             .then(response => {
    //           console.log(response)
        
    //           document.getElementById("mqtt-broker-data").value =  response

    
    //         })
    //             .catch(err => console.error(err));
    //       }
        
        
    //       getMqttBrokerStatusTwo()



// document.getElementById("mqtt-broker-button").addEventListener("click", setMqttBrokerTwoValue)


// function setMqttBrokerTwoValue(){
//     let mqttBrokerValue =   document.getElementById("mqtt-broker-data").value


//     var mqttBrokerSelectionTwo = JSON.stringify({
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
//         body: mqttBrokerSelectionTwo
//     })
//     .then((res)=> {
//     if(res.status === 200){
//         window.location.href="./mqtt.html"
//         return res.json()

//     }else{
//         alert("something went wrong")  ;
//     }})
//     .then((data)=>{
//       console.log(data) 
//     })
//     .catch(err => console.log(err))

// }


document.getElementById("mqtt-broker-form").addEventListener("submit",  setMqttBrokerTwoForm)


function  setMqttBrokerTwoForm(e){
e.preventDefault()
  let mqttBroker = document.getElementById("mqtt-broker-2").value
  let mqttPort= document.getElementById("mqtt-port-2").value
  let mqttPeopleCount= document.getElementById("mqtt-people-count-2").value
  let mqttDeviceHealth= document.getElementById("mqtt-device-health-2").value
  let mqttUserName= document.getElementById("mqtt-user-name-2").value
  let mqttUserPassword = document.getElementById("mqtt-user-password-2").value
  let mqttResponse = document.getElementById("response-2").value


var mqttBrokerTwoData = JSON.stringify({
  config:{
    mqtt1:{
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
        body: mqttBrokerTwoData
    })
    .then((res)=> {
    if(res.status === 200){
        return res.json()
    } else if(res.status === 401){
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
        alert("MQTT parameters is set sucessfully");
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

    }




//     document.getElementById("mqtt-protocol-button-2").addEventListener("click", setMqttProtocolStatusTwo)

// function setMqttProtocolStatusTwo(){

//     let mqttProtocolTwo =   document.getElementById("mqtt-protocol-2").value

  
//     var mqttProtocolSelectionTwo = JSON.stringify({
//       config:{
//         mqtt_two:{
//           "protocol" : mqttProtocolTwo
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
//         body: mqttProtocolSelectionTwo
//     })
//     .then((res)=> {
//     if(res.status === 200){
  
//         return res.json()
//     }
//     else if(res.status === 401){
//       window.location.href="./login.html"
//     }
//     else{
//         alert("something went wrong")  ;
//     }})
//     .then((data)=>{
   
//       console.log(data) 
//     })
//     .catch(err => console.log(err))

// }





document.getElementById("upload-cert-2-button").addEventListener("click",  setMqttProtocolCert)


function  setMqttProtocolCert(){

  var formdata = new FormData();
  formdata.append("mqtt_certificate_file_two", mqtt_certificate_file_two.files[0]);
  

  let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
  var requestOptions = {
    method: 'POST',
    body: formdata,
    headers: {
    //   "Accept": "application/json, */*",
    // "Content-Type": "text/html; charset=utf-8",
  
  Authorization: `Bearer ${BearerCheck}`,
  
  }
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


    //apply
// document.getElementById("mqtt-two-button").addEventListener("click",  setMqttBrokerTwoApplyForm)


// function  setMqttBrokerTwoApplyForm(){

//   let mqttBroker = document.getElementById("mqtt-broker-2").value
//   let mqttPort= document.getElementById("mqtt-port-2").value
//   let mqttPeopleCount= document.getElementById("mqtt-people-count-2").value
//   let mqttDeviceHealth= document.getElementById("mqtt-device-health-2").value
//   let mqttUserName= document.getElementById("mqtt-user-name-2").value
//   let mqttUserPassword = document.getElementById("mqtt-user-password-2").value
//   let mqttResponse = document.getElementById("response-2").value


// var mqttBrokerTwoData = JSON.stringify({
//     "broker": mqttBroker,
//     "port":  mqttPort,
//     "people_count_topic": mqttPeopleCount,
//     "device_health_topic": mqttDeviceHealth,
//     "mqtt_user_name": mqttUserName,
//     "mqtt_password": mqttUserPassword,
//    "response_time" : mqttResponse
//   });

//   let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
//     fetch("http://localhost:8080/api/v1/mqtt/mqtt_two_apply", {
//         method: "POST",
//         headers: {
//             "Accept": "application/json, text/plain, */*",
//             "Content-type": "application/json",
//             Authorization: `Bearer ${BearerCheck}`,
//         },
//         body: mqttBrokerTwoData
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

    
//     document.getElementById("mqtt-protocol-apply-button-2").addEventListener("click", setMqttProtocolStatusApplyTwo)

// function setMqttProtocolStatusApplyTwo(){

//     let mqttProtocolTwo =   document.getElementById("mqtt-protocol-2").value

  
//     var mqttProtocolSelectionTwoApply = JSON.stringify({
//         "mqttProtocolTwo" : mqttProtocolTwo
//       });

//       let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


//     fetch("http://localhost:8080/api/v1/mqtt/mqtt_two_protocol_apply", {
//         method: "POST",
//         headers: {
//             "Accept": "application/json, text/plain, */*",
//             "Content-type": "application/json",
//         Authorization: `Bearer ${BearerCheck}`,

//         },
//         body: mqttProtocolSelectionTwoApply
//     })
//     .then((res)=> {
//     if(res.status === 200){
  
//         return res.json()
//     }  else if(res.status === 401){
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










    