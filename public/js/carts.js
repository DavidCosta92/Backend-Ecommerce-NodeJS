// @ts-nocheck

async function comprarCarrito(){
    const cid = document.getElementById("cidUser").textContent  
    window.location.href = `/api/carts/${cid}/purchase`
}    
function goToAddProducts(){
    window.location.href = '/api/products/add/form'
}
function eliminarCarrito (cid){
    fetch(`/api/carts/${cid}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })    
    .then(resp =>{
        if (resp.status === 200 ){
            alert("Carrito eliminado")
            location.reload()
        } 
        else{
            resp.json().then(data=>{
                alert(data.errorMessage)
            })
        }
    })
}
function vaciarCarrito (cid){
    fetch(`/api/carts/${cid}/products`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })    
    .then(resp =>{
        if (resp.status === 200 ){
            alert("Carrito vaciado")
            location.reload()
        } 
        else{
            resp.json().then(data=>{
                alert(data.errorMessage)
            })
        }
    })
}
async function elegirUnidadesDesdeCartById (pid){    
    const productQuantity = document.getElementById(`quantity${pid}`).value  
    const cid = document.getElementById(pid).parentNode.parentNode.id;
    fetch(`/api/carts/${cid}/products/${pid}?quantity=${productQuantity}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(resp =>{
        if (resp.status ===200 ){
            alert("Cantidad actualizada!")
            location.reload()
        } 
        else{
            resp.json().then(data=>{
                alert(data.errorMessage)
            })
        }
    })
}
async function eliminarProducto (pid){
    const cid = document.getElementById(pid).parentNode.parentNode.parentNode.id;
    await fetch(`/api/carts/${cid}/products/${pid}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(resp =>{
        if (resp.status === 200 ){
            alert("Producto eliminado!")
            location.reload()
        } 
        else{
            resp.json().then(data=>{
                alert(data.errorMessage)
            })
        }
    })
}
/// REVISAR DONDE USO ESTA FUNCION Y VER SI CAMBIARLA DIRECTAMENTE POR "vaciarCarrito(cid)"
/// REVISAR DONDE USO ESTA FUNCION Y VER SI CAMBIARLA DIRECTAMENTE POR "vaciarCarrito(cid)"
/// REVISAR DONDE USO ESTA FUNCION Y VER SI CAMBIARLA DIRECTAMENTE POR "vaciarCarrito(cid)"
/// REVISAR DONDE USO ESTA FUNCION Y VER SI CAMBIARLA DIRECTAMENTE POR "vaciarCarrito(cid)"
async function vaciarCarritoUsuario(){
    const cid = document.getElementById("cidUser").textContent    
    await fetch(`/api/carts/${cid}/products`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(resp =>{
        if (resp.status === 200 ){
            alert("Carrito vaciado")
            location.reload()
        } 
        else{
            resp.json().then(data=>{
                alert(data.errorMessage)
            })
        }
    })
}
/// REVISAR DONDE USO ESTA FUNCION Y VER SI CAMBIARLA DIRECTAMENTE POR "elegirUnidadesDesdeCartById(pid)"
/// REVISAR DONDE USO ESTA FUNCION Y VER SI CAMBIARLA DIRECTAMENTE POR "elegirUnidadesDesdeCartById(pid)"
/// REVISAR DONDE USO ESTA FUNCION Y VER SI CAMBIARLA DIRECTAMENTE POR "elegirUnidadesDesdeCartById(pid)"
/// REVISAR DONDE USO ESTA FUNCION Y VER SI CAMBIARLA DIRECTAMENTE POR "elegirUnidadesDesdeCartById(pid)"
function elegirUnidades (pid){    
    const productQuantity = document.getElementById(`quantity${pid}`).value   
    const cid = document.getElementById(pid).parentNode.parentNode.parentNode.id;
    fetch(`/api/carts/${cid}/products/${pid}?quantity=${productQuantity}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(resp =>{
        if (resp.status === 200 ){
            alert("Unidades actualizadas")
            location.reload()
        } 
        else{
            resp.json().then(data=>{
                alert(data.errorMessage)
            })
        }
    })
}

/// REVISAR DONDE USO ESTA FUNCION Y VER SI CAMBIARLA DIRECTAMENTE POR "eliminarProducto(pid)"
/// REVISAR DONDE USO ESTA FUNCION Y VER SI CAMBIARLA DIRECTAMENTE POR "eliminarProducto(pid)"
/// REVISAR DONDE USO ESTA FUNCION Y VER SI CAMBIARLA DIRECTAMENTE POR "eliminarProducto(pid)"
/// REVISAR DONDE USO ESTA FUNCION Y VER SI CAMBIARLA DIRECTAMENTE POR "eliminarProducto(pid)"
async function eliminarProductosDesdeCartById (pid){    
    const cid = document.getElementById(pid).parentNode.parentNode.id;
    const deleted = await fetch(`/api/carts/${cid}/products/${pid}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(resp =>{
        if (resp.status === 200 ){
            alert("Producto eliminado!")
            location.reload()
        } 
        else{
            resp.json().then(data=>{
                alert(data.errorMessage)
            })
        }
    })
}

/// REVISAR DONDE USO ESTA FUNCION Y VER SI CAMBIARLA DIRECTAMENTE POR "eliminarProducto(pid)"
/// REVISAR DONDE USO ESTA FUNCION Y VER SI CAMBIARLA DIRECTAMENTE POR "eliminarProducto(pid)"
/// REVISAR DONDE USO ESTA FUNCION Y VER SI CAMBIARLA DIRECTAMENTE POR "eliminarProducto(pid)"
/// REVISAR DONDE USO ESTA FUNCION Y VER SI CAMBIARLA DIRECTAMENTE POR "eliminarProducto(pid)"
async function eliminarProductoAdmin (pid){    
    fetch(`/api/products/${pid}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })    
    .then(resp =>{
        console.log(resp)
        if (resp.status === 200 ){
            alert("Producto eliminado!")
            location.reload()
        } 
        else{
            resp.json().then(data=>{
                alert(data.errorMessage)
            })
        }
    })
}




function editProduct(pid){
    console.log("FUNCION PENDIENTE... ",pid)
    alert("FUNCION PENDIENTE... ")
}
