


function editProduct(pid){
    console.log("FUNCION PENDIENTE... ",pid)
    alert("FUNCION PENDIENTE... ")
}


async function eliminarProductoAdmin (pid){
    const deleted = await fetch(`/api/products/${pid}`,{
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