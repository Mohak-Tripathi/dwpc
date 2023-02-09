

function Navbar() {

  return `<div class="container d-flex justify-content-evenly">
  
   
      <div class="navbar-brand ms-0" >
  
        Flamencotech
      </div>
  
  
        <div class="d-flex">
         
    
          <a class="btn btn-primary px-3 me-2 " id="admin-nav" href="./admin.html" role="button" > <span class="material-symbols-outlined">
          admin_panel_settings
          </span> Admin </a>
     
          <a class="btn btn-primary px-3 me-2 service-nav" id="service-nav" href="./service.html" role="button" > <span class="material-symbols-outlined">
          manage_accounts
          </span> Services </a>
          <a class="btn btn-primary px-3 me-2"  id="inference-nav" href="./inference.html" role="button"> <span class="material-symbols-outlined">
          sms
          </span> Inference </a>
          <a class="btn btn-primary px-3 me-2 mqtt-nav" id="mqtt-1-nav"  href="./mqtt.html" role="button"> <span class="material-symbols-outlined me-2">
            settings_ethernet
            </span>MQTT-1</a>
            <a class="btn btn-primary px-3 me-2 mqtt-nav" id="mqtt-2-nav" href="./mqtttwo.html" role="button"> <span class="material-symbols-outlined me-2">
            settings_ethernet
            </span>MQTT-2</a>
          <a class="btn btn-primary px-3 me-2 network-nav" id="wifi-nav"  href="./network.html" role="button"> <span class="material-symbols-outlined me-2">
            wifi
            </span>Network</a>
          <a class="btn btn-primary px-3 me-2" id="dashboard-nav" href="./dashboard.html" role="button"> <span class="material-symbols-outlined me-2">
            space_dashboard
            </span>Dashboard</a>
          <a class="btn btn-primary px-3 me-2" id="logout-nav" role="button"> <span class="material-symbols-outlined me-2">
            logout
            </span>Logout</a>
   
  
         
        </div>
  
    </div>`


}


// const nav= document.querySelector(".navbar")
// fetch("./navbar.html")
// .then(res=> res.text())
// .then(data=> {
//     nav.innerHTML = data;
// })




export {Navbar};

