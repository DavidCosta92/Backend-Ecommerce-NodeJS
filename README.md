-------------- EN CONSTRUCCION -------------- 
# Trabajo-Final-Backend-NodeJS-Coderhouse
> Hola, como estas?
Te comento que este Ecomerce es parte de mi formacion dentro de Coderhouse, y es mi primier proyecto con Node JS.
Debo confesar que proyecto esta enfocado en el backend, por lo  que front solo se vera lo minimo e indispensable para mostrar la informacion.
> Cualquier idea que tengas te pido, me cuentes y me ayudes a mejorar!

------------

### Endpoints
#### Api de Productos, url base (/api/products/) 
 * Ruta: "/", method: GET: 
    -Response: { 
            payload : [ { product } , { product } ],
            totalPages : int,
            prevPage : null / numero de pagina , 
            nextPage : null / numero de pagina , 
            page: int,
            hasPrevPage : boolean ,
            hasNextPage : boolean ,
            prevPage : null / link pagina previa ,
            nextPage : null / link pagina siguiente ,
            limit : int ,
            hayResultados : boolean,
            status: "success, code:200"          
          }
    -Soporta paginado de forma opcional a travez de query params siendo: limit = tamaño de página (por defecto 10); page = pagina solicitada (por defecto 1)
    -Soporta ordenamiento por precio de manera opcional a travez de query params siendo:
      -Pasando parametro "sort=asc", ordena por precios de manera ascendente
      -Pasando parametro "sort=randomString", ordena por precios de manera Descendente
      -Si no se envia parametro sort, no se realiza ningun tipo de ordenamiento
    

------------
 * Ruta: "/", method: POST: 
    -body esperado:{
		  "title" : "prueba", // Req - string - DEBE SER UNICO
		  "description" : "prueba de post", // string  
		  "code" : "prueba de post124wd", // Req - string - DEBE SER UNICO
		  "price" : 100, // Req - number - min : 0
		  "stock" : 5, // Req - number - min : 1
		  "category" : "comestibles", // Req - ENUM  : [ "comestibles" / "varios ]"
		  "thumbnails" : [
						  "./img/comestibles/pan/1.png",
						  "./img/comestibles/pan/2.png",
						  "./img/comestibles/pan/3.png"
						  ]  // array de strings - opcional
		  }
     -Response : 
       {
        ..... producto enviado ..... ,
        "_id": "64444b0888f1b25104d9ca7a" 
        }

------------


 * Ruta: "/:productID", method: GET: 
    -*response, ejemplo ruta: "/api/products/64444b0888f1b25104d9ca7a":* 
      {
        "_id": "64444b0888f1b25104d9ca7a",
        "title": "prueba de post3",
        "description": "prueba de post",
        "code": "prueba de post124wd",
        "price": 100,
        "stock": 5,
        "category": "comestibles",
        "thumbnails": [
          "./img/comestibles/pan/1.png",
          "./img/comestibles/pan/2.png",
          "./img/comestibles/pan/3.png"
        ]
      }
    **-Lanzara exepction en caso de que no se encuentre el ID**
    

------------


 * Ruta: "/:productID", method: DELETE: 
    -Elimina producto enviad y lo devuelve como respuesta.    
  **  -Lanzara exepction en caso de que no se encuentre el ID**
    -*Response, Ejemplo ruta: "/api/products/64444b0888f1b25104d9ca7a": *
      {
        "_id": "64444b0888f1b25104d9ca7a",
        "title": "prueba de post3",
        "description": "prueba de post",
        "code": "prueba de post124wd",
        "price": 100,
        "stock": 5,
        "category": "comestibles",
        "thumbnails": [
          "./img/comestibles/pan/1.png",
          "./img/comestibles/pan/2.png",
          "./img/comestibles/pan/3.png"
        ]
      }
    

------------


 * Ruta: "/:productID", method: PUT: 
    -Esta ruta reemplaza un poducto de manera completa, por lo que exije se envie en el body un producto con todos los campos completos
    **-Lanzara exepction en caso de que no se encuentre el ID**
    *-Response, Ejemplo ruta: "/api/products/64444b0888f1b25104d9ca7a": *
      	{
			"_id": "64444b0888f1b25104d9ca7a",
			"title": "prueba de post3",
			"description": "prueba de post",
			"code": "prueba de post124wd",
			"price": 100,
			"stock": 5,
			"category": "comestibles",
			"thumbnails": [
			  "./img/comestibles/pan/1.png",
			  "./img/comestibles/pan/2.png",
			  "./img/comestibles/pan/3.png"
				]
			}

------------

#### Api de Carritos, url base ( /api/carts/)  
* Ruta: "/", method: GET: 
	Devuelve todos los carritos existentes, con toda la informacion de los productos contenidos en ellos. Soporta paginacion sobre los carritos devueltos
    -Response: 
		{
			"payload": [
						{
							"_id": "643be9502744fd9c6fcdd7ec",
							"products":
									{ "_id": "64300d3d4238e8b125d61976",
										"title": "tortita",
										"description": "con manteca o grasa",
										"code": "cod123154",
										"price": 100,
										"stock": 5,
										"category": "comestibles",
										"thumbnails": [
										"./img/comestibles/pan/1.png",
										"./img/comestibles/pan/2.png",
										"./img/comestibles/pan/3.png"
											],
										"status": true
										},
										"quantity": 50,
										"_id": "643bf20ba1534bcb9e90890d" },
									{},
									{}
							"default": [],
							"id": "643be9502744fd9c6fcdd7ec"
							},
						{...},
						{...}
			],
			"totalPages": 1,
			"prevPage": null,
			"nextPage": null,
			"page": 1,
			"hasPrevPage": false,
			"hasNextPage": false,
			"prevLink": null,
			"nextLink": null,
			"status": "success, code: 200"
		}
	
**    -Soporta paginado de forma opcional a travez de query params siendo: limit = tamaño de página (por defecto 10); page = pagina solicitada (por defecto 1)**
    

------------
* Ruta: "/", method: POST: 
	Crea un carrito nuevo, vacio y lo guarda en la Base de datos, devuelve el objeto creado
    -Response: 
		{
		  "default": [],
		  "_id": "644638ea016fab80a9d75d78",
		  "products": []
		}
	

------------

* Ruta: "/:cid", method: GET: 
	Buscar el carrito por ID, y devuelve los productos en el carrito
    -Response: 
		{
		  "_id": "643be9502744fd9c6fcdd7ec",
		  "products": [
					{
					  "product": {
						"_id": "64300d3d4238e8b125d61976",
						"title": "tortita",
						"description": "con manteca o grasa",
						"code": "cod123154",
						"price": 100,
						"stock": 5,
						"category": "comestibles",
						"thumbnails": [
						  "./img/comestibles/pan/1.png",
						  "./img/comestibles/pan/2.png",
						  "./img/comestibles/pan/3.png"
						],
						"status": true
					  },
					  "quantity": 50,
					  "_id": "643bf20ba1534bcb9e90890d"
					},
					{...},
					{...}			
		  "default": []
		}

------------

* Ruta: "/:cid", method: DELETE: 
	Buscar el carrito por ID, y lo elimina de la base de datos. Devuelve el objeto eliminado
	-Response:
		{
		  "_id": "644638ea016fab80a9d75d78",
		  "default": [],
		  "products": []
		}
		
------------

* Ruta: "/:cid/products/:pid", method: POST: 
	Agrega productos a un carrito, requiere ID de carrito y ID de producto a agregar
	-Response:
	  {
		"_id": "644638ea016fab80a9d75d78",
		"default": [],
		"products": [ {...}, {...}, { nuevo producto agregado}]
	  }
	  
------------

* Ruta: "/:cid/products/:pid", method: DELETE: 
	Elimina un producto de un carrito, requiere ID de carrito y ID de producto a eliminar. 	Retorna el carrito habiendo removido el producto selecionado.
	-Response:
	  {
		"_id": "644638ea016fab80a9d75d78",
		"default": [],
		"products": [ {...}, {...}]
	  }
	  
------------
* Ruta: "/:cid/products", method: DELETE: 
	Vacia el carrito, eliminando todos los productos que contenia. **NO ELIMINA EL CARRITO**
	-Response:
		{
		  "_id": "643c8918d69f0c99ced6a327",
		  "products": [],
		  "default": []
		}
	  
------------

* Ruta: "/:cid/products/:pid?quantity=n", method: PUT: 
	Actualiza la cantidad de un producto en un carrito, Requiere ID de carrito, ID de producto y el nuevo valor (entero mayor a 0), pasado por query params (?quantity=10). **REEMPLAZA EL VALOR GUARDADO POR EL NUEVO VALOR.** Retorna carrito actualizado.
	-Response:
	  {
		"_id": "644638ea016fab80a9d75d78",
		"default": [],
		"products": [ {...}, {...}]
	  }
	  
------------

* Ruta: "/:cid", method: PUT: 
	Actualiza todos los productos de un carrito, requiere un array de productos. Retorna el carrito con los productos actualizados.
	-Response:
	  {
		"_id": "644638ea016fab80a9d75d78",
		"default": [],
		"products": [ {...}, {...}]
	  }
	  
------------
#### Api de Vistas, url base (/api/views/)

*** Ruta: "/:products", method: GET: **
	-Muestra **todos los productos en la base de datos de manera grafica**, junto con un mensaje de que el usuario esta Logueado / Deslogueado, y un boton para redirigir a la pagina de login. Esta pagina solo permite ver los productos, sin permitir acciones sobre ellos. (Si esta logueado un usuario de tipo admin, permite eliminar productos, y si fuera un usuarior regular, le permite agregar productos a carrito)
	

------------
*** Ruta: "/:carts", method: GET: **
	-Muestra **todos los carritos en la base de datos de manera grafica**, junto a los productos que contiene cada carrito.  Permite crear nuevos carritos, vaciarlos, o eliminarlos, tambien se puede cambiar cantidad de productos y eliminarlos del carrito.
	
------------
*** Ruta: "/:carts", method: GET: **
	-Muestra **todos los productos en un carrito**, ademas de acciones como modificar cantidades de productos, eliminarlos del carrito, vaciar el carrito completo y eliminar el carrito.
	
------------
  
  
  --------------------- EN CONSTRUCCION  --------------------- 
