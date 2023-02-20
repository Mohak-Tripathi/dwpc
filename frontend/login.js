

//  const jwt = require("jsonwebtoken");


const credentials=  [
  {
    app_user: "Production_User",
    app_password: "6515a828fcd7955efa8614e8fe32f6b6",
    role: "Production"
  },
  {
    app_user: "Support_User",
    app_password: "e556a8ac44843c4f0849a07e23c72948",
    role: "Support"
  },
  {
    app_user: "Demo_User",
    app_password: "fc9b98fd63286f67cfe9b212f31afe28",
    role: "Demo"
  }
]




document.getElementById("login-form").addEventListener("submit", loginForm)


  function loginForm(e){
e.preventDefault()
    let username = document.getElementById("username-login").value
    let password = document.getElementById("password-login").value

    const hashedPwd = CryptoJS.MD5(username + password).toString();

    // alert(hashedPwd)

      let targetObject = credentials.filter((elem) => {
        return elem.app_user === username;
      });
    
      if (
        username === targetObject[0].app_user &&
        hashedPwd === targetObject[0].app_password
      ) {
        // const token =     jwt.sign(
        //   { username },
        //   "DwpcProject@fTIoT",
        //   {
        //     expiresIn: "15m", // expires in 1 hours
        //   }
        // );
        // localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(targetObject[0].role));

        if(targetObject[0].role === "Production"){
                      window.location.href= "admin.html"
          }
         else if(targetObject[0].role === "Support"){
                      window.location.href=  "service.html"
          }
          else{
                      window.location.href="dashboard.html"
         }
        }
        else{
          alert("Please provide correct login credentials")
        }




    }
        // fetch("http://localhost:8080/api/v1/login", {
        //     method: "POST",
        //     headers: {
        //         "Accept": "application/json, text/plain, */*",
        //         "Content-type": "application/json",
        //     },
        //     body: loginData
        // })
        // .then((res)=> {
        // if(res.status === 200){
        //     return res.json()
        // }
        // else if(res.status === 401){
        //     window.location.href="../login/login.html"
        //   }
        // else{
        //     alert("username and password does not match")  ;
        // }})
        // .then((data)=>{
        //     if(data){
        //         console.log(data)
        //          localStorage.setItem("token", JSON.stringify(data.token));
        //          localStorage.setItem("user", JSON.stringify(data.user.role));
          
        //          if(data.user.role === "Production"){
        //             window.location.href= "../admin/admin.html"
        //          }
        //          else if(data.user.role === "Support"){
        //             // window.location.href="../service/service.html"
        //             window.location.href=  "../service/service.html"
        //          }
        //          else{
        //             window.location.href="../dashboard/dashboard.html"
        //          }
           
        //         }   
        // })
        // .catch(err => console.log(err))



// async function loginDetails(username, password){


//       try{
//         var loginData = JSON.stringify({
//             username: "Production_User",
//             password: "f213ca89494ed2145819fd304ba0cee5"
//           });


//           const config = {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           };
      
//           const { data } = await axios.post(
//             `http://localhost:8080/api/v1/login`, loginData ,   config
//           );
  
//           console.log(data)
//       }
//       catch(error){

//         console.log(error)
//       }
// }