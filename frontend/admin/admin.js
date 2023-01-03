

document.getElementById("admin-apMode-form").addEventListener("submit", getAdminSsidValue)

async function getAdminSsidValue(e){
    e.preventDefault()
    let apModeSSID= document.getElementById("admin-apModeSSID").value

    var apData = JSON.stringify({
        "ap_mode_ssid": apModeSSID
      });

      let BearerCheck = localStorage.getItem("token") || null



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

//   try{
    // var apData = JSON.stringify({
    //     "ap_mode_ssid": apModeSSID
    //   });
      
    //   const config = {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     };
    
//         const { data } = await axios.post(
//           `http://localhost:8080/api/v1/admin/ap_mode_ssid`, { withCredentials: true }, apData ,   config
//         );

//         console.log(data)
//   }catch(error){
//     console.log(error);
//   }
  


}






document.getElementById("admin-apModePassword-form").addEventListener("submit", getAdminSsidPassValue)

function getAdminSsidPassValue(e){
    e.preventDefault()
    let apModeSSIDPass= document.getElementById("admin-apModeSSIDPass").value

    console.log(apModeSSIDPass, "jjoko")

    
}


document.getElementById("admin-apModePassword-form").addEventListener("submit", getAdminSsidPassValue)

function getAdminSsidPassValue(e){
    e.preventDefault()
    let apModeSSIDPass= document.getElementById("admin-apModeSSIDPass").value

    console.log(apModeSSIDPass, "jjoko")
}