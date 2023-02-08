let userRole = JSON.parse(localStorage.getItem("user") || null)



if(userRole ==="Support"){
 document.getElementById("inference-nav").style.display= "none"
 
 document.getElementById("admin-nav").style.display= "none"

}

if(userRole ==="Demo"){
    document.getElementById("inference-nav").style.visibility= "hidden"
    document.getElementById("admin-nav").style.visibility= "hidden"
    document.getElementById("service-nav").style.visibility= "hidden"
    document.getElementById("mqtt-1-nav").style.visibility= "hidden"
    document.getElementById("mqtt-2-nav").style.visibility= "hidden"
    document.getElementById("wifi-nav").style.visibility= "hidden"


   
   }
