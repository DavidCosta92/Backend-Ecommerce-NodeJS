// @ts-nocheck
const formResetPassword = document.getElementById("formResetPassword")

if (formResetPassword instanceof HTMLFormElement){
    formResetPassword.addEventListener("submit", async event =>{
        event.preventDefault()
        const email = document.getElementById("input_email").value           
        const restore = await fetch('/api/users/restore-password',{
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({email : email})
        })        
        restore.json().then(data =>{
            console.log(data)
            if (restore.status === 200) {
                alert(`Revisa tu casilla de correo, hemos enviado un email con pasos a seguir! : ${data.mensaje}`)
                window.location.href = 'http://localhost:8080/'
            }else {
                alert(`Parece que hubo un error ${data.errorMessage}`)
            }   
        })
    })
}

function goToRegister(){    
    window.location.href = '/api/users/register'
}
function goToProducts(){    
    window.location.href = '/api/users/products'
}