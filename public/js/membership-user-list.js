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