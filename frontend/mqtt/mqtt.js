
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
    }else{
        alert("something went wrong")  ;
    }})
    .then((data)=>{
      console.log(data) 
    })
    .catch(err => console.log(err))

}
