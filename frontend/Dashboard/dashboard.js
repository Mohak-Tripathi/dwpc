


function getDashboardData(){


    let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
        fetch("http://localhost:8080/api/v1/dashboard/data", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${BearerCheck}`,
        },
      })
        // .then(response => response.json())
        .then((response)=> {
  
          if(response.status === 200){
              return response.json()
          }
          else if(response.status === 401){
            window.location.href="../login/login.html"
          }
          else{
              alert("something went wrong")  ;
          }})
        .then(response => {
          console.log(response)
       
          // document.getElementById("footfall-target").innerHTML = response.footfall_target
          document.getElementById("footfall-today").innerHTML =  response.footfall_today
          document.getElementById("dashboard-entry").innerHTML = response.last_received_entry
          document.getElementById("dashboard-exit").innerHTML = response.last_received_exit
          document.getElementById("time-stamp").innerHTML = response.time_stamp
    
  
        })
        .catch(err => console.error(err));
      }
    
    
      getDashboardData()