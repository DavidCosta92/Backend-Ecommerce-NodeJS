// @ts-nocheck
async function comprarCarrito(){
    const cid = document.getElementById("cidUser").textContent  
    window.location.href = `/api/carts/${cid}/purchase`
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
async function deleteProductFromCart (pid){
    const cid = document.getElementById(pid).parentNode.parentNode.id;
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
function vaciarCarrito(){
    const cid = document.getElementById("cidUser").textContent   
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
function elegirUnidades (pid){    
    const productQuantity = document.getElementById(`quantity${pid}`).value   
    const cid = document.getElementById(pid).parentNode.parentNode.id;
    
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