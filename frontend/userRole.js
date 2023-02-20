// let userRole = JSON.parse(localStorage.getItem("user") || null)



// if(userRole ==="Support"){
//  document.getElementById("inference-nav").style.display= "none"
 
//  document.getElementById("admin-nav").style.display= "none"
//  document.getElementById("admin-page").style.display= "none"
//  document.getElementById("inference-page").style.display= "none"

// //  document.getElementById("admin-nav").style.display= "none"
// //  document.getElementById("admin-nav").style.display= "none"

// //   document.getElementById("admin-nav").style.display= "none"

// }

// if(userRole ==="Demo"){
//     document.getElementById("inference-nav").style.visibility= "hidden"
//     document.getElementById("admin-nav").style.visibility= "hidden"
//     document.getElementById("service-nav").style.visibility= "hidden"
//     document.getElementById("mqtt-1-nav").style.visibility= "hidden"
//     document.getElementById("mqtt-2-nav").style.visibility= "hidden"
//     document.getElementById("wifi-nav").style.visibility= "hidden"
//     document.getElementById("admin-page").style.display= "none"
//     document.getElementById("service-page").style.display= "none"
//     document.getElementById("mqtt-1-page").style.display= "none"
//     document.getElementById("mqtt-2-page").style.display= "none"
//     document.getElementById("inference-page").style.display= "none"


   
//    }

const activePage = window.location.pathname;
// console.log(activePage, "pp")
const navLinks = document.querySelectorAll("a").forEach(link => {
//    console.log(link, "link")
    if(link.href.includes(`${activePage}`)){
        link.classList.add("active")
    }
})


userRole = JSON.parse(localStorage.getItem("user") || null)



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
