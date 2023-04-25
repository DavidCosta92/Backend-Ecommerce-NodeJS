const formLogOut = document.getElementById("formLogOut")

if (formLogOut instanceof HTMLFormElement){
    formLogOut.addEventListener("submit", async event =>{
        event.preventDefault()

        const { status } = await fetch('/api/users/session', {
            method: 'DELETE'
          })      
          if (status === 200) {
            window.location.href = '/'
          } else {
            console.log('[logout] estado inesperado: ' + status)
          }

    })
}