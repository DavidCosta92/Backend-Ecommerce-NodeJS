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
    const cid = document.getElementById(pid).parentNode.parentNode.parentNode.id;
    const productQuantity = document.getElementById(`quantity${pid}`).value   
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