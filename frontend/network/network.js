
document.getElementById("network-wifi-form").addEventListener("submit", getWifiInferenceForm)


function  getWifiInferenceForm(e){
e.preventDefault()
  let networkSsid = document.getElementById("network-wifi-ssid").value
  let networkPassword = document.getElementById("network-wifi-password").value


// console.log(aggregationInterval, InZoneDistanceThrehold )

var inferenceData = JSON.stringify({
    "SSID": networkSsid,
    "password": networkPassword 
  
  });

  let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
    fetch("http://localhost:8080/api/v1/network/cred", {
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



    
document.getElementById("network-staticip-wifi-form").addEventListener("submit", getStaticIpWifiInferenceForm)


function  getStaticIpWifiInferenceForm(e){
e.preventDefault()
  let networkStaticIpWifi = document.getElementById("network-static-ip-wifi").value
  let networkGatewayIpWifi = document.getElementById("network-gateway-ip-wifi").value


// console.log(aggregationInterval, InZoneDistanceThrehold )

var inferenceStaticWifiData = JSON.stringify({
    "static_ip": networkStaticIpWifi,
    "gateway_ip": networkGatewayIpWifi
  
  });

  let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
    fetch("http://localhost:8080/api/v1/network/static_ip_wifi", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json",
            Authorization: `Bearer ${BearerCheck}`,
        },
        body: inferenceStaticWifiData
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



        
document.getElementById("network-staticip-ethernet-form").addEventListener("submit", getStaticIpEthernetInferenceForm)


function  getStaticIpEthernetInferenceForm(e){
e.preventDefault()
  let networkStaticIpEthernet = document.getElementById("network-static-ip-ethernet").value
  let networkGatewayIpEthernet = document.getElementById("network-gateway-ip-ethernet").value


var inferenceStaticEthernetData = JSON.stringify({
    "static_ip_ethernet": networkStaticIpEthernet ,
    "gateway_ip_ethernet": networkGatewayIpEthernet
  
  });

  let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
    fetch("http://localhost:8080/api/v1/network/static_ip_eth", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json",
            Authorization: `Bearer ${BearerCheck}`,
        },
        body: inferenceStaticEthernetData
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


    document.getElementById("ntp-form").addEventListener("submit", getNtpForm)


function  getNtpForm(e){
e.preventDefault()
  let ntpValue = document.getElementById("ntp-data").value

var ntpDataValue = JSON.stringify({
    "ntpServer": ntpValue

  
  });

  let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
    fetch("http://localhost:8080/api/v1/network/ntp_server", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json",
            Authorization: `Bearer ${BearerCheck}`,
        },
        body: ntpDataValue
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





