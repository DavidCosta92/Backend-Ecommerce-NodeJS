// @ts-nocheck
const formUserRegister = document.getElementById("formUserRegister")

if (formUserRegister instanceof HTMLFormElement){
    formUserRegister.addEventListener("submit", async event =>{
        event.preventDefault()
        const first_name = document.getElementById("input_first_name").value
        const last_name = document.getElementById("input_last_name").value
        const email = document.getElementById("input_email").value
        const age = document.getElementById("input_age").value
        const password = document.getElementById("input_password").value

        const user = {
            first_name :first_name, 
            last_name :last_name ,
            email :email ,
            age :age ,
            password :password 
        }

        const userCreated = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }           
          }).then(res => res.json())
    })
}
