// @ts-nocheck

// INICIA para cargar producto con METODO POST
//<form id="formCargaProducto" action="/api/products" method="post">
const form = document.getElementById("formCargaProducto")
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
        actualizarProductsRenders();

    })
}
// FINALIZA para cargar producto con METODO POST





/// para web socket 
const serverSocket = io('http://localhost:8080');
const plantilla = `
{{#if hayProductos }}
<table class="table table-dark table-striped">
  <thead>
    <tr>
      <th scope="col">Titulo</th>
      <th scope="col">Precio</th>
      <th scope="col">Descripcion</th>
      <th scope="col">Id</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {{#each productos}}
        <tr>    
        <td>{{this.title}}</td>
        <td>{{this.price}}</td>
        <td>{{this.description}}</td>  
        <td>{{this._id}}</td>
        <td>
            <button onClick=eliminarProducto("{{this._id}}") id={{this._id}} type="button" class="btn btn-danger">
                Eliminar
            </button>
        </td>
        </tr>
    {{/each}}
  </tbody>
</table>

{{else}}
<p>NO HAY PRODUCTOS AUN...</p>
{{/if}}
`
const armarHtmlDinamico = Handlebars.compile(plantilla) 


function obtenerDatosForm(){
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const code = document.getElementById('code').value
    const price = document.getElementById('price').value
    const category = document.getElementById('category').value
    const stock = document.getElementById('stock').value
    const thumbnails = document.getElementById('thumbnails').value
    const productoNuevo = {title : title , description : description , code : code , price : price , category : category , stock : stock , thumbnails : thumbnails}
    crearProducto(productoNuevo)
}

function eliminarProducto(id){
    serverSocket.emit('eliminarProducto', id)
}
serverSocket.on('newClient', productos=>{
    console.log("CONECTADO A SERVIDOR")
    const div = document.getElementById("productosRealTime")
    if(div) div.innerHTML = armarHtmlDinamico({productos, hayProductos: productos.length > 0 })
} )

serverSocket.on('actualizarRender', productos=>{
    const div = document.getElementById("productosRealTime")
    if(div) div.innerHTML = armarHtmlDinamico({productos, hayProductos: productos.length > 0 })
} )


function actualizarProductsRenders(){
    serverSocket.emit('actualizarProductsRenders')
}

