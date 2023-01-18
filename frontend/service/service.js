
document.getElementById("calliberate-button").addEventListener("click", getCalliberateValue)


function getCalliberateValue(){

    var calliberateData = JSON.stringify({
        "calliberate" : "start"
      });


      let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


    fetch("http://localhost:8080/api/v1/service/calliberate", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json",
        Authorization: `Bearer ${BearerCheck}`,

        },
        body: calliberateData
    })
    .then((res)=> {
    if(res.status === 200){
        return res.json()
    }else if(res.status === 401){
        window.location.href="../login/login.html"
      }
    else{
        alert("something went wrong")  ;
    }})
    .then((data)=>{
      console.log(data) 
    })
    .catch(err => console.log(err))

}




document.getElementById("reset-button").addEventListener("click", getResetValue)


function getResetValue(){

    var factoryResetData = JSON.stringify({
        "factoryReset": "hello"
      });

      
      let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


    fetch("http://localhost:8080/api/v1/service/factory-reset", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json",
        Authorization: `Bearer ${BearerCheck}`,

        },
        body: factoryResetData
    })
    .then((res)=> {
    if(res.status === 200){
        return res.json()
    }else if(res.status === 401){
        window.location.href="../login/login.html"
      }
    else{
        alert("something went wrong")  ;
    }})
    .then((data)=>{
      console.log(data) 
    })
    .catch(err => console.log(err))

}



document.getElementById("reboot-button").addEventListener("click", getRebootValue)


function getRebootValue(){

    var rebootData = JSON.stringify({
        "reboot": "reboot-start"
      });

      
      let BearerCheck = JSON.parse(localStorage.getItem("token") || null)


    fetch("http://localhost:8080/api/v1/service/reboot", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json",
        Authorization: `Bearer ${BearerCheck}`,

        },
        body: rebootData
    })
    .then((res)=> {
    if(res.status === 200){
        return res.json()
    }else if(res.status === 401){
        window.location.href="../login/login.html"
      }
    else{
        alert("something went wrong")  ;
    }})
    .then((data)=>{
      console.log(data) 
    })
    .catch(err => console.log(err))

}