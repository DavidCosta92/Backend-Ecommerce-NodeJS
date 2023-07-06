const formLogOut = document.getElementById("formLogOut")

if (formLogOut instanceof HTMLFormElement){
    formLogOut.addEventListener("submit", async event =>{
        event.preventDefault()
        fetch('/api/users/session', {
            method: 'DELETE'
          })          
          .then(resp =>{
            if (resp.status === 200 ){
                alert("¡Hasta luego!")
                location.reload()
            } 
            else{
                resp.json().then(data=>{
                    alert(data.errorMessage)
                })
            }
        })  
        window.location.href = '/'
    })
}
function goToUserProfile(){
  window.location.href = '/api/session/current'
}
function goToHome(){
  window.location.href = '/'
}
function goToMembershipsList(){  
  window.location.href = '/api/users/premium/'
}