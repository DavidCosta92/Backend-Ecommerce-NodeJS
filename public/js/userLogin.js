// @ts-nocheck
const formUserLogin = document.getElementById("formUserLogin")

if (formUserLogin instanceof HTMLFormElement){
    formUserLogin.addEventListener("submit", async event =>{
        event.preventDefault()
        const email = document.getElementById("input_email")        
        const password = document.getElementById("input_password")

        /*
        deberia validar email y pass, para luego enviar data user..
        if (
            input_email instanceof HTMLInputElement &&
            input_password instanceof HTMLInputElement
          ) { }
        */
        const dataUser = {email: email.value, password : password.value}   

        // actualmente los formularios estan seteados para trabajar con passport.. cambiar ruta del form post
        const session = await fetch(/*'/api/users/session'*/'/api/users/session/localLogin', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUser)
        })        

        const statusSession = await session.json()
        if (session.status === 201) {
            alert("Logueo exitoso, te enviaremos a productos..")
            window.location.href = '/api/users/products'
        } else {
            alert(statusSession.errorMessage)
        }
    })
}

function goToRegister(){    
    window.location.href = '/api/users/register'
}
