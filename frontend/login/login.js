


document.getElementById("login-form").addEventListener("submit", loginForm)


  function loginForm(e){
e.preventDefault()
    let username = document.getElementById("username-login").value
    let password = document.getElementById("password-login").value

    const hashedPwd = CryptoJS.MD5(username + password).toString();

    console.log(hashedPwd, "hashedpwd")
    var loginData = JSON.stringify({
        username: username,
        password: hashedPwd
      });


        fetch("http://localhost:8080/api/v1/login", {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-type": "application/json"
            },
            body: loginData
        })
        .then((res)=> {
        if(res.status === 200){
            return res.json()
        }else{
            alert("username and password does not match")  ;
        }})
        .then((data)=>{
            if(data){
console.log(data)
                 localStorage.setItem("token", JSON.stringify(data.token));
                 localStorage.setItem("user", JSON.stringify(data.user.role));
          
                 if(data.user.role == "Production"){
                    window.location.href="../admin/admin.html"
                 }
                 else if(data.user.role == "Support"){
                    window.location.href="../service/service.html"
                 }
                 else{
                    window.location.href="../dashboard/dashboard.html"
                 }
           
                }   
        })
        .catch(err => console.log(err))

}

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