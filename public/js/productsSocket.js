// @ts-nocheck

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

function eliminarProducto(pid){
    serverSocket.emit('eliminarProducto', pid)
}



serverSocket.on('newClient', productos =>{
    console.log("CONECTADO A SERVIDOR")
    const div = document.getElementById("productosRealTime")    
    if(div) div.innerHTML = armarHtmlDinamico({productos, hayProductos: productos.length > 0 })  
})

serverSocket.on('actualizarRender', productos=>{
    const div = document.getElementById("productosRealTime")
    if(div) div.innerHTML = armarHtmlDinamico({productos, hayProductos: productos.length > 0 })
} )


function actualizarProductsRenders(){
    serverSocket.emit('actualizarProductsRenders')
}
