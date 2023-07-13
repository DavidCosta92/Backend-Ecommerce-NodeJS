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

        // actualmente los formularios estan seteados para trabajar con passport.. cambiar ruta del form post        
        await fetch(/*'/api/users/'*/'/api/users/'/*session/localRegister'*/, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }           
          })
          .then(res=>{
            console.log(res)
            if(res.status === 201){
              alert("Registro y logueo exitoso, te enviaremos a productos..")
              window.location.assign('/api/users/products')
            } else{
              res.json().then(data=>{
                  alert("Error de registro, vuelve a intentar por favor! ( Detalle=> : " + data.errorMessage +" )")
              })
            }
          })
    })
}
function goToHome(){
  window.location.href = '/'
}