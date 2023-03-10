
let userRole = JSON.parse(localStorage.getItem("user") || null)


if(userRole ==="Demo"){
 document.getElementById("service-page").style.display= "none"
}



document.getElementById("caliberate-button").addEventListener("click", getCalliberateValue)


function getCalliberateValue(){

    // var calliberateData = JSON.stringify({
    //     "calliberate" : "start"
    //   });


    //   let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


    fetch("/rpc/calibration", {
        method: "GET",
        // headers: {
        //     "Accept": "application/json, text/plain, */*",
        //     "Content-type": "application/json",
        // Authorization: `Bearer ${BearerCheck}`,

        // },
        // body: calliberateData
    })
    .then((res)=> {
    if(res.status === 200){
        return res.json()
    }else if(res.status === 401){
        window.location.href="./login.html"
      }
    else{
        alert("something went wrong")  ;
    }})
    .then((data)=>{
      console.log(data) 
      alert("Calibration is done sucessfully");
    })
    .catch(err => console.log(err))

}




document.getElementById("reset-button").addEventListener("click", getResetValue)


function getResetValue(){

    // var factoryResetData = JSON.stringify({
    //     "factoryReset": "hello"
    //   });

      
      // let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


    fetch("/rpc/factoryReset")
        // method: "GET",
        // headers: {
        //     "Accept": "application/json, text/plain, */*",
        //     "Content-type": "application/json",
        // // Authorization: `Bearer ${BearerCheck}`,

        // },
        // body: factoryResetData
    // })
    .then((res)=> {
    if(res.status === 200){
        return res.json()
    }else if(res.status === 401){
        window.location.href="./login.html"
      }
    else{
        alert("something went wrong")  ;
    }})
    .then((data)=>{
      alert("Factory Reset is done sucessfully");
      console.log(data) 

    })
    .catch(err => console.log(err))

}



document.getElementById("reboot-button").addEventListener("click", getRebootValue)


function getRebootValue(){

 


    fetch("/rpc/rebootSensor", {
        method: "GET",
        // headers: {
        //     "Accept": "application/json, text/plain, */*",
        //     "Content-type": "application/json",
        // Authorization: `Bearer ${BearerCheck}`,

        // },
        // body: rebootData
    })
    .then((res)=> {
    if(res.status === 200){
        return res.json()
    }else if(res.status === 401){
        window.location.href="./login.html"
      }
    else{
        alert("something went wrong")  ;
    }})
    .then((data)=>{
      alert("Reboot is done sucessfully");
      console.log(data) 
    })
    .catch(err => console.log(err))

}