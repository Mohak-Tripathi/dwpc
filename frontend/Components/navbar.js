

function Navbar() {

  return `<div class="container d-flex justify-content-evenly">
  
   
      <div class="navbar-brand ms-0" >
  
        Flamencotech
      </div>
  
  
        <div class="d-flex">
            <a class="btn btn-secondary px-3 me-2 admin-nav" id="admin-nav-two" href="../admin/admin.html" role="button"> <span class="material-symbols-outlined">
              admin_panel_settings
              </span> Admin</a>
          <!-- <button type="button" class="btn btn-secondary px-3 me-2">
            Admin
          </button> -->
  
     
          <a class="btn btn-primary px-3 me-2 service-nav" href="../service/service.html" role="button" > <i class="fa-solid fa-right-to-bracket"></i> Services </a>
          <a class="btn btn-primary px-3 me-2 inderence-nav" href="../inference/inference.html" role="button"> <i class="fa-solid fa-sensor"></i> Inference </a>
          <a class="btn btn-primary px-3 me-2 mqtt-nav" href="../mqtt/mqtt.html" role="button"> <span class="material-symbols-outlined me-2">
            settings_ethernet
            </span>MQTT-1</a>
            <a class="btn btn-primary px-3 me-2 mqtt-nav" href="../mqtt/mqtttwo.html" role="button"> <span class="material-symbols-outlined me-2">
            settings_ethernet
            </span>MQTT-2</a>
          <a class="btn btn-primary px-3 me-2 network-nav" href="../network/network.html" role="button"> <span class="material-symbols-outlined me-2">
            wifi
            </span>Network</a>
          <a class="btn btn-primary px-3 me-2" href="../dashboard/dashboard.html" role="button"> <span class="material-symbols-outlined me-2">
            space_dashboard
            </span>Dashboard</a>
          <a class="btn btn-primary px-3 me-2" href="logout.html" role="button"> <span class="material-symbols-outlined me-2">
            logout
            </span>Logout</a>
   
  
         
        </div>
  
    </div>`


}





export {Navbar};

