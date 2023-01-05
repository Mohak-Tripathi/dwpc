
function getMqttDataTwo(){


    let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
        fetch("http://localhost:8080/api/v1/mqtt/mqtt_two", {
            method: 'GET',
            headers: {
          Authorization: `Bearer ${BearerCheck}`,
            },
        })
            .then(response => response.json())
            .then(response => {
          console.log(response)
    

            document.getElementById("mqtt-broker-2").value = response.broker
            document.getElementById("mqtt-port-2").value = response.port
            document.getElementById("mqtt-people-count-2").value = response.people_count_topic
             document.getElementById("mqtt-device-health-2").value = response.device_health_topic
           document.getElementById("mqtt-user-name-2").value = response.mqtt_user_name
            document.getElementById("mqtt-user-password-2").value = response.mqtt_password
            document.getElementById("mqtt-protocol-2").value = response.mqtt_protocol
            document.getElementById("mqtt-cert-2").value = response.ca

      

       

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



document.getElementById("mqtt-broker-button").addEventListener("click", setMqttBrokerTwoValue)


function setMqttBrokerTwoValue(){
    let mqttBrokerValue =   document.getElementById("mqtt-broker-data").value


    var mqttBrokerSelectionTwo = JSON.stringify({
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
        body: mqttBrokerSelectionTwo
    })
    .then((res)=> {
    if(res.status === 200){
        window.location.href="./mqtt.html"
        return res.json()

    }else{
        alert("something went wrong")  ;
    }})
    .then((data)=>{
      console.log(data) 
    })
    .catch(err => console.log(err))

}


document.getElementById("mqtt-broker-form").addEventListener("submit",  setMqttBrokerTwoForm)


function  setMqttBrokerTwoForm(e){
e.preventDefault()
  let mqttBroker = document.getElementById("mqtt-broker-2").value
  let mqttPort= document.getElementById("mqtt-port-2").value
  let mqttPeopleCount= document.getElementById("mqtt-people-count-2").value
  let mqttDeviceHealth= document.getElementById("mqtt-device-health-2").value
  let mqttUserName= document.getElementById("mqtt-user-name-2").value
  let mqttUserPassword = document.getElementById("mqtt-user-password-2").value


var mqttBrokerTwoData = JSON.stringify({
    "broker": mqttBroker,
    "port":  mqttPort,
    "people_count_topic": mqttPeopleCount,
    "device_health_topic": mqttDeviceHealth,
    "mqtt_user_name": mqttUserName,
    "mqtt_password": mqttUserPassword
  });

  let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
    fetch("http://localhost:8080/api/v1/mqtt/mqtt_two", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json",
            Authorization: `Bearer ${BearerCheck}`,
        },
        body: mqttBrokerTwoData
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




    document.getElementById("mqtt-protocol-button-2").addEventListener("click", setMqttProtocolStatusTwo)

function setMqttProtocolStatusTwo(){

    let mqttProtocolTwo =   document.getElementById("mqtt-protocol-2").value

  
    var mqttProtocolSelectionTwo = JSON.stringify({
        "mqttProtocolTwo" : mqttProtocolTwo
      });

      let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


    fetch("http://localhost:8080/api/v1/mqtt/mqtt_two_protocol", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json",
        Authorization: `Bearer ${BearerCheck}`,

        },
        body: mqttProtocolSelectionTwo
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





document.getElementById("mqtt-cert-form").addEventListener("submit",  setMqttProtocolCert)


function  setMqttProtocolCert(e){
e.preventDefault()

const data= document.getElementById("upload-mqtt-certificate").value


var formdata = new FormData();
formdata.set("mqtt_cert_file", data );

// fileInput.files[0]
let BearerCheck = JSON.parse(localStorage.getItem("token") || null)

var requestOptions = {
  method: 'POST',
  body: formdata,
  headers: {
    "Accept": "application/json, text/plain, */*",

Authorization: `Bearer ${BearerCheck}`,

},
  redirect: 'follow'
};

fetch("http://localhost:8080/api/v1/mqtt/mqtt_one_cert_file", requestOptions)

.then((res)=> {
    if(res.status === 200){
        
        return res.text()
    }else{
        console.log(res);
                console.log(res.status);
                console.log(res.json());
                console.log(res.text());
        alert("something went wrong")  ;
    }})
    .then((data)=>{
      console.log(data) 
    })
    .catch(err => console.log(err))


    }










    