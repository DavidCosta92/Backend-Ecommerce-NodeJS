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
        alert("Producto creado")
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

function editProduct(pid){
    console.log("FUNCION PENDIENTE... ",pid)
    alert("FUNCION PENDIENTE... ")
}