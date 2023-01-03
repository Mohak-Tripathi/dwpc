
document.getElementById("login-form").addEventListener("submit", loginForm)


  function loginForm(e){
e.preventDefault()
    let username = document.getElementById("username-login").value
    let password = document.getElementById("password-login").value

    console.log( username , password)
    loginDetails(username, password)

}

async function loginDetails(username, password){


      try{
        var loginData = JSON.stringify({
            username: "Production_User",
            password: "f213ca89494ed2145819fd304ba0cee5"
          });


          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
      
          const { data } = await axios.post(
            `http://localhost:8080/api/v1/login`, loginData ,   config
          );
  
          console.log(data)
      }
      catch(error){

        console.log(error)
      }
}