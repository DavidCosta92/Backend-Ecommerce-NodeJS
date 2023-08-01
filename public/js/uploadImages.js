function deleteDocument (uid,name){
    fetch(`/api/users/${uid}/documents/`,{
        method: "DELETE",
        body: JSON.stringify({userId : uid , fileName : name}),
        headers: {
            "Content-Type": "application/json",
        }
    })    
    .then(resp =>{
        if (resp.status === 200 ){
            alert("¡ Archivo eliminado! ")
            location.reload()
        } 
        else{
            resp.json().then(data=>{
                alert(data.errorMessage)
            })
        }
    })
}