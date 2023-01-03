

document.getElementById("admin-apMode-form").addEventListener("submit", getAdminSsidValue)

async function getAdminSsidValue(e){
    e.preventDefault()
    let apModeSSID= document.getElementById("admin-apModeSSID").value

    console.log(apModeSSID, "joj")

  try{
    var apData = JSON.stringify({
        "ap_mode_ssid": apModeSSID
      });
      
      const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
    
        const { data } = await axios.post(
          `http://localhost:8080/api/v1/admin/ap_mode_ssid`, { withCredentials: true }, apData ,   config
        );

        console.log(data)
  }catch(error){
    console.log(error);
  }
  


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