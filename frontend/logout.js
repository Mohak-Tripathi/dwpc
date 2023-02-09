
document.getElementById("logout-nav").addEventListener("click", logoutFunction)


function logoutFunction(){
    localStorage.clear()
    window.location.href= "./login.html"

}