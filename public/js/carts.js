// @ts-nocheck

function createNewCart(){
    fetch(`/api/carts/`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
    
    console.log("SUPUESTAMENTE CREE UN CARRITO NUEVO")   
}
function agregarProductoAlCarrito(pid){
    const cid ="643be9502744fd9c6fcdd7ec"
    fetch(`/api/carts/${cid}/products/${pid}?`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
    console.log("HICE CLICK ENA GREGAR AL CARRITO AL PRODUCTO id:", pid)    
}
function eliminarCarrito (cid){
    fetch(`/api/carts/${cid}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
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
}
function elegirUnidades (pid){    
    const productQuantity = document.getElementById(`quantity${pid}`).value   
    const cid = document.getElementById(pid).parentNode.parentNode.parentNode.id;
    fetch(`/api/carts/${cid}/products/${pid}?quantity=${productQuantity}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    })
}
function elegirUnidadesDesdeCartById (pid){    
    const productQuantity = document.getElementById(`quantity${pid}`).value  
    const cid = document.getElementById(pid).parentNode.parentNode.id;
    console.log("cid", cid)
    console.log("pid", pid)
    fetch(`/api/carts/${cid}/products/${pid}?quantity=${productQuantity}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    })
    
}

function eliminarProducto (pid){
    const cid = document.getElementById(pid).parentNode.parentNode.parentNode.id;
    fetch(`/api/carts/${cid}/products/${pid}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

function eliminarProductosDesdeCartById (pid){    
    const cid = document.getElementById(pid).parentNode.parentNode.id;
    fetch(`/api/carts/${cid}/products/${pid}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    
}