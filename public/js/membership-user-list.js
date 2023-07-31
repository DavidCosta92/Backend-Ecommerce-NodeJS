async function changeMembership(uid){    
    fetch(`/api/users/premium/${uid}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(resp =>{
        if(resp.status === 200){                
            alert("Membresia actualizada")
            location.reload()
        }else{
            resp.json().then(data=>{
                alert ("Error al cambiar membresia, intenta nuevamente! ( Detalle=> " +data.errorMessage+ ")")
            })
        }
    })
}

async function deleteUser(uid){
    fetch(`/api/users/${uid}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(resp =>{
        resp.json().then(data =>{
            if(data.status === 200){
                alert(data.message)
            } else {
                alert ("Error al eliminar, intenta nuevamente! ( Detalle=> " +data.errorMessage+ ")")
            }
        })
    })
}