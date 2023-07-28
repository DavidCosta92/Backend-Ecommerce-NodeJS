// @ts-nocheck

const form = document.getElementById("formEditProduct")
if(form instanceof HTMLFormElement){
    form.addEventListener ("submit", event =>{
        event.preventDefault()
        const formData = new FormData(form)
        const data = {}

        formData.forEach((value, key)=> (data[key] = value))     

        fetch("/api/products",{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then( res=>{
            if(res.status === 200){                
                alert("Producto Editado")
                window.location.assign('/web/products')
            }else{
                res.json().then(data=>{
                    alert ("Error en la edicion del producto, intenta nuevamente! ( Detalle=> " +data.errorMessage+ ")")
                })
            }
        })
    })
}