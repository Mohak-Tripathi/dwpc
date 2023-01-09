
document.getElementById("logout-nav").addEventListener("click", logoutFunction)


function logoutFunction(){
    localStorage.clear()
    window.location.href= "http://127.0.0.1:5500/frontend/admin/admin.html"

}