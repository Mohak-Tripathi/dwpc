function Navbar() {

  return `<div class="container d-flex justify-content-evenly">
  
   
      <div class="navbar-brand ms-0" >
  
        Flamencotech
      </div>
  
  
        <div class="d-flex">
            <a class="btn btn-secondary px-3 me-2"  href="../admin/admin.html" role="button"> <span class="material-symbols-outlined">
              admin_panel_settings
              </span> Admin</a>
          <!-- <button type="button" class="btn btn-secondary px-3 me-2">
            Admin
          </button> -->
  
      
          <a class="btn btn-primary px-3 me-2" href="service.html" role="button" > <i class="fa-solid fa-right-to-bracket"></i> Services </a>
          <a class="btn btn-primary px-3 me-2" href="sensor.html" role="button"> <i class="fa-solid fa-sensor"></i> Sensor </a>
          <a class="btn btn-primary px-3 me-2" href="../mqtt/mqtt.html" role="button"> <span class="material-symbols-outlined me-2">
            settings_ethernet
            </span>MQTT</a>
          <a class="btn btn-primary px-3 me-2" href="../network/network.html" role="button"> <span class="material-symbols-outlined me-2">
            wifi
            </span>Network</a>
          <a class="btn btn-primary px-3 me-2" href="network.html" role="button"> <span class="material-symbols-outlined me-2">
            space_dashboard
            </span>Dashboard</a>
          <a class="btn btn-primary px-3 me-2" href="logout.html" role="button"> <span class="material-symbols-outlined me-2">
            logout
            </span>Logout</a>
   
  
         
        </div>
  
    </div>`


}
export {Navbar};

