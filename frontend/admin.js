



let userRole = JSON.parse(localStorage.getItem("user") || null)



if(userRole ==="Support" || userRole ==="Demo"){
 document.getElementById("admin-page").style.display= "none"
 
}


function getAdminData(){

    // let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
        fetch("/rpc/Config.Get", { 
            method: 'GET',
          //   headers: {
          // Authorization: `Bearer ${BearerCheck}`,
          //   },
        })
            // .then(response => response.json())
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
              // console.log(response.wifi.ap.ssid,1 )
              // console.log(response.admin.variant,2 )
              // console.log( response.wifi.ap.pass, 3)
              console.log( response.wifi.sta.enable, 4)

              let newValue = response.wifi.sta.enable  == true ? "enabled" : "disabled"
             
          document.getElementById("variant-data").value = response.admin.variant
          document.getElementById("admin-apModeSSID").value =  response.wifi.ap.ssid
          document.getElementById("admin-apModeSSIDPass").value =  response.wifi.ap.pass
        //   document.getElementById("otaUpdate").value = response.ota
          document.getElementById("wifi-admin-data").value = newValue
       
        })
            .catch(err => console.log(err));
      }
    
    
      getAdminData()




document.getElementById("variant-button").addEventListener("click", getVariantValue)


function getVariantValue(){

    let variantValue =   document.getElementById("variant-data").value

    var variantSelection = JSON.stringify({
      config:{
        admin: {
          "variant": variantValue
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
        body: variantSelection
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
      // console.log(data) 
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
 
        alert("Variant Parameters is set sucessfully");
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

}









document.getElementById("admin-apMode-form").addEventListener("submit", getAdminSsidValue)

function getAdminSsidValue(e){
    e.preventDefault()
    let apModeSSID= document.getElementById("admin-apModeSSID").value

    var apData = JSON.stringify({
      config:{
        wifi:{
          "ap.ssid": apModeSSID
        }
      }
      
      });

      // let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


    fetch("/rpc/Config.Set", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json",
        // Authorization: `Bearer ${BearerCheck}`,

        },
        body: apData
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
        alert("Ap Mode SSID Parameter is set sucessfully");
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))


}


document.getElementById("admin-apModePassword-form").addEventListener("submit", getAdminSsidPassValue)

function getAdminSsidPassValue(e){
    e.preventDefault()
    let apModeSSIDPass= document.getElementById("admin-apModeSSIDPass").value

    var apDataPass = JSON.stringify({
      config:{
        wifi: {
          "ap.pass": apModeSSIDPass
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
        body: apDataPass
    })
    .then((res)=> {
    if(res.status === 200){
        return res.json()
    }
    else if(res.status === 401){
        window.location.href="../login/login.html"
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
        alert("AP Mode SSID password parameter is set sucessfully");
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

    
}



document.getElementById("ota-update-button").addEventListener("click", getOtaValue)

function getOtaValue(){
    var formdata = new FormData();
  formdata.append("firmwareFile", ota_file.files[0]);
  

  // let BearerCheck = JSON.parse(localStorage.getItem("token") || null)

  var requestOptions = {
    method: 'POST',
    body: formdata
    // headers: {
    //      Authorization: `Bearer ${BearerCheck}`
    //  }
  };
  // http://localhost:8080/api/v1/admin/ota
  
  fetch("/update", requestOptions)
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
          // console.log(data) 
          alert("Firmware flash is updated sucessfully");
        })
        .catch(err => console.log(err))

}


document.getElementById("wifi-button").addEventListener("click", getWifiValue)


function getWifiValue(){

    let wifiValue =   document.getElementById("wifi-admin-data").value

    // let value=   wifiValue =="enabled" ? true : false
    var wifiSelection = JSON.stringify({
      config: {
        wifi: {
          "sta.enable": wifiValue== "enabled" ? true : false
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
        body: wifiSelection
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

        alert("Wifi status parameter is set sucessfully");
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

}




// Apply buttons logic 

// document.getElementById("variant-apply-button").addEventListener("click", getVariantApplyValue)


// function getVariantApplyValue(){

//     let variantApplyValue =   document.getElementById("variant-data").value
    
//     var variantSelection = JSON.stringify({
//         "variantData": variantApplyValue 
//       });

//       let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


//     fetch("http://localhost:8080/api/v1/admin/variant_apply", {
//         method: "POST",
//         headers: {
//             "Accept": "application/json, text/plain, */*",
//             "Content-type": "application/json",
//         Authorization: `Bearer ${BearerCheck}`,

//         },
//         body: variantSelection
//     })
//     .then((res)=> {
//     if(res.status === 200){
//         return res.json()
//     }
//     else if(res.status === 401){
//         window.location.href="../login/login.html"
//       }
//     else{
//         alert("something went wrong")  ;
//     }})
//     .then((data)=>{
//       console.log(data) 
//     })
//     .catch(err => console.log(err))

// }



// document.getElementById("ap-mode-apply").addEventListener("click", getAPmodeApplyValue)


// function getAPmodeApplyValue(){

//     let apModeApplyValue =   document.getElementById("admin-apModeSSID").value

// //    console.log(apModeApplyValue, "gto")
    
//    var apData = JSON.stringify({
//     "ap_mode_ssid": apModeApplyValue
//   });

//   let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


// fetch("http://localhost:8080/api/v1/admin/ap_mode_ssid_apply", {
//     method: "POST",
//     headers: {
//         "Accept": "application/json, text/plain, */*",
//         "Content-type": "application/json",
//     Authorization: `Bearer ${BearerCheck}`,

//     },
//     body: apData
// })
// .then((res)=> {
// if(res.status === 200){
//     return res.json()
// }
// else if(res.status === 401){
//     window.location.href="../login/login.html"
//   }
// else{
//     alert("something went wrong")  ;
// }})
// .then((data)=>{
//   console.log(data) 
// })
// .catch(err => console.log(err))

// }


// document.getElementById("ap-mode-pass-apply").addEventListener("click", getAPmodePassApplyValue)

// function getAPmodePassApplyValue(){

//     let apModePassApplyValue =   document.getElementById("admin-apModeSSIDPass").value

//    console.log(apModePassApplyValue, "gto")
    
//    var apDataPass = JSON.stringify({
//     "ap_mode_ssid_pass":  apModePassApplyValue
//   });

//   let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


// fetch("http://localhost:8080/api/v1/admin/ap_mode_ssid_pass_apply", {
//     method: "POST",
//     headers: {
//         "Accept": "application/json, text/plain, */*",
//         "Content-type": "application/json",
//     Authorization: `Bearer ${BearerCheck}`,

//     },
//     body: apDataPass
// })
// .then((res)=> {
// if(res.status === 200){
//     return res.json()
// }
// else if(res.status === 401){
//     window.location.href="../login/login.html"
//   }
// else{
//     alert("something went wrong")  ;
// }})
// .then((data)=>{
//   console.log(data) 
// })
// .catch(err => console.log(err))


// }




// document.getElementById("ota-apply-button").addEventListener("click", getOtaApplyValue)

// function getOtaApplyValue(e){

//     let otaApplyValue = document.getElementById("otaUpdate").value

//     var otaApplyData = JSON.stringify({
//         "otaData": otaApplyValue
//       });

//       let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


//     fetch("http://localhost:8080/api/v1/admin/ota_apply", {
//         method: "POST",
//         headers: {
//             "Accept": "application/json, text/plain, */*",
//             "Content-type": "application/json",
//         Authorization: `Bearer ${BearerCheck}`,

//         },
//         body: otaApplyData
//     })
//     .then((res)=> {
//     if(res.status === 200){
//         return res.json()
//     }else{
//         alert("something went wrong")  ;
//     }})
//     .then((data)=>{
//       console.log(data) 
//     })
//     .catch(err => console.log(err))

// }


// document.getElementById("wifi-apply-button").addEventListener("click", getWifiApplyValue)


// function getWifiApplyValue(){

//     let wifiApplyValue =   document.getElementById("wifi-admin-data").value

    
//     var wifiSelection = JSON.stringify({
//         "wifiStatus": wifiApplyValue
//       });

//       let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


//     fetch("http://localhost:8080/api/v1/admin/wifi-status_apply", {
//         method: "POST",
//         headers: {
//             "Accept": "application/json, text/plain, */*",
//             "Content-type": "application/json",
//         Authorization: `Bearer ${BearerCheck}`,

//         },
//         body: wifiSelection
//     })
//     .then((res)=> {
//     if(res.status === 200){
//         return res.json()
//     }
//     else if(res.status === 401){
//         window.location.href="../login/login.html"
//       }
//     else{
//         alert("something went wrong") ;
//     }})
//     .then((data)=>{
//       console.log(data) 
//     })
//     .catch(err => console.log(err))


// }










