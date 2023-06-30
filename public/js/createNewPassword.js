// @ts-nocheck
const formNewPassword = document.getElementById("formNewPassword")

if (formNewPassword instanceof HTMLFormElement){
    formNewPassword.addEventListener("submit", async event =>{
        event.preventDefault()
        const password = document.getElementById("input_password").value   
        const email = document.getElementById("input_email").value
        
        const newPassword = await fetch('/api/users/new-password',{
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({password : password , email : email})
        })        

        if (newPassword.status === 200) {
            alert("Revisa tu casilla de correo, hemos enviado un emal con pasos a seguir!")
            window.location.href = 'http://localhost:8080/'
        } else {
            const newPasswordStatus = await newPassword.json()
            alert(newPasswordStatus.errorMessage)
        }
       
    })
}

function goToRegister(){    
    window.location.href = '/api/users/register'
}
function goToProducts(){    
    window.location.href = '/api/users/products'
}