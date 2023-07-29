// @ts-nocheck
const formUserLogin = document.getElementById("formUserLogin")
if (formUserLogin instanceof HTMLFormElement){
    formUserLogin.addEventListener("submit", async event =>{
        event.preventDefault()
        const email = document.getElementById("input_email")        
        const password = document.getElementById("input_password")
        const dataUser = {email: email.value, password : password.value}   
        const session = await fetch(
            '/api/users/session/signedCookie',{
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUser)
        })        

        if (session.status === 201) {
            alert("Logueo exitoso, te enviaremos a productos..")
            window.location.href = '/web/products'
        } else {
            const statusSession = await session.json()
            alert(statusSession.errorMessage)
        }       
    })
}

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
                goToHome()
            } 
            else{
                resp.json().then(data=>{
                    alert(data.errorMessage)
                })
            }
        })  
    })
}
function deleteInactiveUsers(){        
    fetch(`/api/users/`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(resp =>{
        if (resp.status === 200 ){
            alert("Se borraron usuarios inactivos")
            location.reload()
        } 
        else{
            resp.json().then(data=>{
                alert(data.errorMessage)
            })
        }
    })
}
function goToHome(){
  window.location.href = '/'
}
function goToUserProfile(){
  window.location.href = '/web/session/current'
}
function goToMembershipsList(){  
  window.location.href = '/web/users/premium/'
}
function goToAddProducts(){
  window.location.href = '/web/products/add/form'
}
function redirigirProductos(){
  window.location.href = `/web/products`;
}
function goToRegister(){    
    window.location.href = '/web/users/register'
}
function goToProducts(){    
    window.location.href = '/web/products'
}
function goToRestorePassword(){
    window.location.href = '/web/users/restore-password'
}
function goToUploadDocuments(){
    const uid = document.getElementById("userId").textContent
    window.location.href =`/web/users/${uid}/documents/`
}