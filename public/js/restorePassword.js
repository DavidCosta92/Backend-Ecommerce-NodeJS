// @ts-nocheck
const formResetPassword = document.getElementById("formResetPassword")

if (formResetPassword instanceof HTMLFormElement){
    formResetPassword.addEventListener("submit", async event =>{
        event.preventDefault()
        const email = document.getElementById("input_email").value   
        console.log("intentando enviar input_email", email)     
        
        const restore = await fetch('/api/users/restore-password',{
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({email : email})
        })        

        if (restore.status === 200) {
            alert("Revisa tu casilla de correo, hemos enviado un emal con pasos a seguir!")
            window.location.href = 'http://localhost:8080/'
        } else {
            const restoreStatus = await restore.json()
            alert(restoreStatus.errorMessage)
        }
       
    })
}

function goToRegister(){    
    window.location.href = '/api/users/register'
}
function goToProducts(){    
    window.location.href = '/api/users/products'
}