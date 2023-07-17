// @ts-nocheck
const formNewPassword = document.getElementById("formNewPassword")

if (formNewPassword instanceof HTMLFormElement){
    formNewPassword.addEventListener("submit", async event =>{
        event.preventDefault()
        const password = document.getElementById("input_password").value   
        const email = document.getElementById("input_email").value  
        const token = document.getElementById("input_token").value

        
        const newPassword = await fetch('/api/users/new-password',{
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({password : password , email : email , token : token})
        })        
        
        newPassword.json().then(data =>{
            console.log("newPassword =>", newPassword)
            console.log("data =>",data)
            if (newPassword.status === 200) {
                alert(`Perfecto! ${data.mensaje}`)
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