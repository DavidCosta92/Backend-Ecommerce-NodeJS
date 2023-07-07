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
async function agregarProductoAlCarritoUsuario(pid){        
    const cid = document.getElementById("cidUser").textContent
    const productQuantity = document.getElementById(`quantity${pid}`).value  
    await fetch(`/api/carts/${cid}/products/${pid}?quantity=${productQuantity}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(resp =>{
        if (resp.status ===200 ){
            alert("Producto agregado!")
            location.reload()
        } 
        else{
            resp.json().then(data=>{
                alert(data.errorMessage)
            })
        }
    })
}

