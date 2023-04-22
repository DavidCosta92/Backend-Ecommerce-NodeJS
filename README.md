-------------- EN CONSTRUCCION -------------- 
-------------- EN CONSTRUCCION -------------- 

# Trabajo-Final-Backend-NodeJS-Coderhouse
Hola, como estas?
Te comento que este Ecomerce es parte de mi formacion dentro de Coderhouse, y es mi primier proyecto con Node JS.
Debo confesar que proyecto esta enfocado en el backend, por lo  que front solo se vera lo minimo e indispensable para mostrar la informacion.

Cualquier idea que tengas te pido, me cuentes y me ayudes a mejorar!

Sin mas, que lo disfrutes!

Endpoints segun funcionalidades
1) Api de Productos, url base (/api/products/) 
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
    
 * Ruta: "/", method: POST: 
    -body esperado:
     {
      "title" : "prueba", // REQUERIDO - STRING - NO DEBE SER IGUAL A OTRO EXISTENTE EN BD
      "description" : "prueba de post", // STRING  
      "code" : "prueba de post124wd", // REQUERIDO - STRING - NO DEBE SER IGUAL A OTRO EXISTENTE EN BD
      "price" : 100, // REQUERIDO - NUMBER - MIN : 0
      "stock" : 5, // REQUERIDO - NUMBER - MIN : 1
      "category" : "comestibles", // REQUERIDO - TIPO ENUM POSIBLES : "comestibles" / "varios"
      "thumbnails" : [
                      "./img/comestibles/pan/1.png",
                      "./img/comestibles/pan/2.png",
                      "./img/comestibles/pan/3.png"
                      ]  // TIPO ARRAY - OPCIONAL
      }
     -Response : 
       {
        .. producto enviado .. ,
        "_id": "64444b0888f1b25104d9ca7a" 
        }

 * Ruta: "/:productID", method: GET: 
    -Response, Ejemplo ruta: "/api/products/64444b0888f1b25104d9ca7a": 
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
    -Lanzara exepction en caso de que no se encuentre el ID
    
 * Ruta: "/:productID", method: DELETE: 
    -Elimina producto enviad y lo devuelve como respuesta.    
    -Lanzara exepction en caso de que no se encuentre el ID
    -Response, Ejemplo ruta: "/api/products/64444b0888f1b25104d9ca7a": 
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
    
 * Ruta: "/:productID", method: PUT: 
    -Esta ruta reemplaza un poducto de manera completa, por lo que exije se envie en el body un producto con todos los campos completos
    -Lanzara exepction en caso de que no se encuentre el ID
    -Response, Ejemplo ruta: "/api/products/64444b0888f1b25104d9ca7a": 
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
2) Api de Carritos, url base ( /api/carts/)  
 - 
3) Vistas, url base ( /api/views/) 
 * Ruta: "/add/form/", method: GET: 
  -Muestra formulario para poder crear un nuevo producto a travez del endpoint /api/products/, pero mediante el formulario
  -No muestra ninguna respuesta.
  
  
  
  --------------------- EN CONSTRUCCION  --------------------- 
