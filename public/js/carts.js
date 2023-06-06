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
async function vaciarCarritoUsuario (){
    const cid = document.getElementById("cidUser").textContent    
    const emptyCart = await fetch(`/api/carts/${cid}/products`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (emptyCart.status ===200) {
        alert("¡Carrito vacio!")
        location.reload()
    }

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
async function elegirUnidadesDesdeCartById (pid){    
    const productQuantity = document.getElementById(`quantity${pid}`).value  
    const cid = document.getElementById(pid).parentNode.parentNode.id;
    const update = await fetch(`/api/carts/${cid}/products/${pid}?quantity=${productQuantity}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (update.status ===200 ){
        alert("Cantidad actualizada!")
        location.reload()
    }
    
}
async function eliminarProducto (pid){
    const cid = document.getElementById(pid).parentNode.parentNode.parentNode.id;
    const deleted = await fetch(`/api/carts/${cid}/products/${pid}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (deleted.status ===200 ){
        alert("Producto eliminado!")
        location.reload()
    }
}
async function eliminarProductosDesdeCartById (pid){    
    const cid = document.getElementById(pid).parentNode.parentNode.id;
    const deleted = await fetch(`/api/carts/${cid}/products/${pid}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (deleted.status ===200 ){
        alert("Producto eliminado!")
        location.reload()
    }
}

async function comprarCarrito(){
    const cid = document.getElementById("cidUser").textContent
    console.log(`COMPRANDO CARRITO ${cid}` )

    const cartStatus = await fetch(`/api/carts/${cid}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (cartStatus.status ===200 ){
        alert("carrito comprado!, DEBERIA SER REDIRIGIDO A RESUMEN DE COMPRA SUPONGO... ")
        // window.location.href = '/api/carts/summary' ???
       // location.reload()
    }
}    