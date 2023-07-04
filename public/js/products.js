// @ts-nocheck

const form = document.getElementById("formCargaProducto")
if(form instanceof HTMLFormElement){
    form.addEventListener ("submit", event =>{
        event.preventDefault()
        const formData = new FormData(form)
        const data = {}

        formData.forEach((value, key)=> (data[key] = value))     

        fetch("/api/products",{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then( res=>{
            if(res.status === 200){                
                alert("Producto creado")
                window.location.assign('/api/users/products')
            }else{
                res.json().then(data=>{
                    alert ("Error en la creacion del producto, intenta nuevamente! ( Detalle=> " +data.errorMessage+ ")")
                })
            }
        })
    })
}


function goToLogin(){
    window.location.href = '/api/users/login'
}

function agregarProductoAlCarrito(pid){    
    const cid = document.getElementById(`cid${pid}`).value  
    const productQuantity = document.getElementById(`quantity${pid}`).value  
    fetch(`/api/carts/${cid}/products/${pid}?quantity=${productQuantity}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
}
async function agregarProductoAlCarritoUsuario(pid){    
    
    const cid = document.getElementById("cidUser").textContent
    const productQuantity = document.getElementById(`quantity${pid}`).value  
    const add = await fetch(`/api/carts/${cid}/products/${pid}?quantity=${productQuantity}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (add.status ===200 ){
        alert("Producto agregado!")
        location.reload()
    }
    
}

