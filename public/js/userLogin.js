// @ts-nocheck
const formUserLogin = document.getElementById("formUserLogin")

if (formUserLogin instanceof HTMLFormElement){
    console.log("ENVIANDO FORM PARA LOGIN")
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

        const { status } = await fetch('/api/users/session', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUser)
        })        
        if (status === 201) {
            window.location.href = '/api/users/products'
        } else {
            alert('¡Login erroneo!: codigo' + status)
        }
    })
}

function goToRegister(){    
    window.location.href = '/api/users/register'
}


function logInGithub(){
    console.log("DEBO ESTAR LOGUEANDOME EN GIT")
}

function singInGithub(){
    console.log("DEBO ESTAR REGISTRANDOME EN GIT")
    
}