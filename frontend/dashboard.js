


//  Open a WebSocket to the server.
  //  Need a Regular Expression to get the URL to open the WebSocket to
  //  Matches 192.168.1.8 etc.
  const serverUrlRegex = /\d+\.\d+\.\d+\.\d+/;
  //  Get the URL from the browser.
  const currentUrl = window.location.origin;
  console.log(`The currentURL is ${currentUrl}.`);
  //  Extract what is needed to create WebSocket.
  const serverUrl = currentUrl.match(serverUrlRegex);
  //  The match is in the 0th element of the array.
  console.log(`The server URL is ${serverUrl[0]}`);
  //  Comment this for static URI.
  let ws = new WebSocket(`ws://${serverUrl}`);
  ws.onopen = () => {
    console.log("Web browser opened a WebSocket.");
  };

  ws.onclose = () => {
    console.log("Web browser WebSocket just closed.");
    alert("Unexpectedly websockets has closed, Please referesh the page..!!");
  };
  // Display the data from the server in web page
  ws.onmessage = (message) => {
    let dwpc = JSON.parse(message.data);
    let dwpc_date = new Date(dwpc.time);
    // let distanceInmeters = dwpc.getDistance;
    // let distance0InMeters = dwpc.getDistance0;
    // let distance1InMeters = dwpc.getDistance1;
    // document.getElementById("time").innerHTML =
    //   dwpc_date.getHours() +
    //   ":" +
    //   dwpc_date.getMinutes() +
    //   ":" +
    //   dwpc_date.getSeconds();
    // document.getElementById("incount").innerHTML = dwpc.incount;
    // document.getElementById("outcount").innerHTML = dwpc.outcount;
    // document.getElementById("absloute").innerHTML = dwpc.absloute;
    // document.getElementById("distance").innerHTML = (
    //   distanceInmeters / 1000
    // ).toPrecision(3);

          // document.getElementById("footfall-target").innerHTML = response.footfall_target
          document.getElementById("footfall-today").innerHTML =  dwpc.absloute
          document.getElementById("dashboard-entry").innerHTML = dwpc.incount
          document.getElementById("dashboard-exit").innerHTML = dwpc.outcount
          document.getElementById("time-stamp").innerHTML =     dwpc_date.getHours() +
          ":" +
          dwpc_date.getMinutes() +
          ":" +
          dwpc_date.getSeconds();


    console.log("DWPC Data: ", dwpc);
  };

  // To raise an alert pop-up window when the web sockkets connection is closed
  ws.onerror = (message) => {
    alert("Unexpectedly websockets is closed, Please refresh the page..!!");
  };




// function getDashboardData(){


    // let BearerCheck = JSON.parse(localStorage.getItem("token") || null)
    //     fetch("http://localhost:8080/api/v1/dashboard/data", {
    //     method: 'GET',
    //     headers: {
    //       Authorization: `Bearer ${BearerCheck}`,
    //     },
    //   })
    //     // .then(response => response.json())
    //     .then((response)=> {
  
    //       if(response.status === 200){
    //           return response.json()
    //       }
    //       else if(response.status === 401){
    //         window.location.href="../login/login.html"
    //       }
    //       else{
    //           alert("something went wrong")  ;
    //       }})
    //     .then(response => {
    //       console.log(response)
       
    //       // document.getElementById("footfall-target").innerHTML = response.footfall_target
    //       document.getElementById("footfall-today").innerHTML =  response.footfall_today
    //       document.getElementById("dashboard-entry").innerHTML = response.last_received_entry
    //       document.getElementById("dashboard-exit").innerHTML = response.last_received_exit
    //       document.getElementById("time-stamp").innerHTML = response.time_stamp
    
  
    //     })
    //     .catch(err => console.error(err));
    //   }
    
    
    //   getDashboardData()
