
function getAdminData(){


    let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
        fetch("http://localhost:8080/api/v1/admin/admin_info", {
            method: 'GET',
            headers: {
          Authorization: `Bearer ${BearerCheck}`,
            },
        })
            .then(response => response.json())
            .then(response => {
          console.log(response)

          document.getElementById("variant-data").value = response.variant
          document.getElementById("admin-apModeSSID").value =  response.ap_mode_ssid
          document.getElementById("admin-apModeSSIDPass").value =  response.ap_mode_ssid_pass 
          document.getElementById("otaUpdate").value = response.ota
          document.getElementById("wifi-admin-data").value = response.wifi_status
       
        })
            .catch(err => console.error(err));
      }
    
    
      getAdminData()










document.getElementById("variant-button").addEventListener("click", getVariantValue)


function getVariantValue(){

    let variantValue =   document.getElementById("variant-data").value

    console.log(variantValue, "jojjo")
    var variantSelection = JSON.stringify({
        "variantData": variantValue
      });

      let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


    fetch("http://localhost:8080/api/v1/admin/variant", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json",
        Authorization: `Bearer ${BearerCheck}`,

        },
        body: variantSelection
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






document.getElementById("admin-apMode-form").addEventListener("submit", getAdminSsidValue)

async function getAdminSsidValue(e){
    e.preventDefault()
    let apModeSSID= document.getElementById("admin-apModeSSID").value

    var apData = JSON.stringify({
        "ap_mode_ssid": apModeSSID
      });

      let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


    fetch("http://localhost:8080/api/v1/admin/ap_mode_ssid", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json",
        Authorization: `Bearer ${BearerCheck}`,

        },
        body: apData
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






document.getElementById("admin-apModePassword-form").addEventListener("submit", getAdminSsidPassValue)

function getAdminSsidPassValue(e){
    e.preventDefault()
    let apModeSSIDPass= document.getElementById("admin-apModeSSIDPass").value

    var apDataPass = JSON.stringify({
        "ap_mode_ssid_pass": apModeSSIDPass
      });

      let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


    fetch("http://localhost:8080/api/v1/admin/ap_mode_ssid_pass", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json",
        Authorization: `Bearer ${BearerCheck}`,

        },
        body: apDataPass
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



document.getElementById("admin-ota-form").addEventListener("submit", getOtaValue)

function getOtaValue(e){
    e.preventDefault()
    let otaValue = document.getElementById("otaUpdate").value

    var apDataPass = JSON.stringify({
        "otaData": otaValue
      });

      let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


    fetch("http://localhost:8080/api/v1/admin/ota", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json",
        Authorization: `Bearer ${BearerCheck}`,

        },
        body: apDataPass
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




document.getElementById("wifi-button").addEventListener("click", getWifiValue)


function getWifiValue(){

    let wifiValue =   document.getElementById("wifi-admin-data").value

    var wifiSelection = JSON.stringify({
        "wifiStatus": wifiValue
      });

      let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


    fetch("http://localhost:8080/api/v1/admin/wifi-status", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json",
        Authorization: `Bearer ${BearerCheck}`,

        },
        body: wifiSelection
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


