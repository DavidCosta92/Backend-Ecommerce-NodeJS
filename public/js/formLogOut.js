const formLogOut = document.getElementById("formLogOut")

if (formLogOut instanceof HTMLFormElement){
    formLogOut.addEventListener("submit", async event =>{
        event.preventDefault()

        const { status } = await fetch('/api/users/session', {
            method: 'DELETE'
          })      
          if (status !== 200) {
            console.log('[logout] estado inesperado: ' + status)  
          }          
          window.location.href = '/'

    })
}

function goToUserProfile(){
  window.location.href = '/api/session/current'
}
function goToHome(){
  window.location.href = '/'
}