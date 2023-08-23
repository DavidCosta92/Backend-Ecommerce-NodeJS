// @ts-nocheck
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
const formUploadProfile = document.getElementById("formUploadProfile")
if(formUploadProfile instanceof HTMLFormElement){
    formUploadProfile.addEventListener ("submit", event =>{
        event.preventDefault()
        const formData = new FormData(formUploadProfile)       
        const uid = document.getElementById("userId").innerText

        fetch(`/api/users/${uid}/documents/profile/`,{
            method: "POST",
            body: formData
        })
        .then( res=>{
            res.json().then(data=>{
                if(res.status === 201){                
                    alert(data.message)
                    window.location.reload()
                } else{
                    alert ("Error al subir archivo, intenta nuevamente! ( Detalle=> " +data.errorMessage+ ")")
                }
            })
        })
    })
}
const formUploadProduct = document.getElementById("formUploadProduct")
if(formUploadProduct instanceof HTMLFormElement){
    formUploadProduct.addEventListener ("submit", event =>{
        event.preventDefault()
        const formData = new FormData(formUploadProduct)       
        const uid = document.getElementById("userId").innerText
        const productToUpdate =document.getElementById("productToUpdate").value
        fetch(`/api/users/${uid}/documents/product/${productToUpdate}`,{
            method: "POST",
            body: formData
        })
        .then( res=>{
            res.json().then(data=>{
                if(res.status === 201){                
                    alert(data.message)
                    window.location.reload()
                } else{
                    alert ("Error al subir archivo, intenta nuevamente! ( Detalle=> " +data.errorMessage+ ")")
                }
            })
        })
    })
}
const formUploadDocument = document.getElementById("formUploadDocument")
if(formUploadDocument instanceof HTMLFormElement){
    formUploadDocument.addEventListener ("submit", event =>{
        event.preventDefault()
        const formData = new FormData(formUploadDocument)       
        const uid = document.getElementById("userId").innerText

        fetch(`/api/users/${uid}/documents/document/`,{
            method: "POST",
            body: formData
        })
        .then( res=>{
            res.json().then(data=>{
                if(res.status === 201){                
                    alert(data.message)
                    window.location.reload()
                } else{
                    alert ("Error al subir archivo, intenta nuevamente! ( Detalle=> " +data.errorMessage+ ")")
                }
            })
        })
    })
}