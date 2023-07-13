// @ts-nocheck
const formUserLogin = document.getElementById("formUserLogin")
if (formUserLogin instanceof HTMLFormElement){
    formUserLogin.addEventListener("submit", async event =>{
        event.preventDefault()
        const email = document.getElementById("input_email")        
        const password = document.getElementById("input_password")
        const dataUser = {email: email.value, password : password.value}   
        const session = await fetch(
            /*'/api/users/session'*/                //setea para trabajar con login manual 
            /*'/api/users/session/localLogin' */    //setea para trabajar con passport 
            /*'/api/users/session/signedCookie'*/       //setea para trabajar con sgined cookies 
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
            window.location.href = '/api/users/products'
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

function goToHome(){
  window.location.href = '/'
}
function goToUserProfile(){
  window.location.href = '/api/session/current'
}
function goToMembershipsList(){  
  window.location.href = '/api/users/premium/'
}
function goToAddProducts(){
  window.location.href = '/api/products/add/form'
}
function redirigirProductos(){
  window.location.href = `http://localhost:8080/api/users/products`;
}
function goToRegister(){    
    window.location.href = '/api/users/register'
}
function goToProducts(){    
    window.location.href = '/api/users/products'
}
function goToRestorePassword(){
    window.location.href = '/api/users/restore-password'
}