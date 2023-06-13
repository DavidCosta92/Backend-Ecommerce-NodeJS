/*
ESTTA ES UNA FORMA MEJOR PARA MANEJAR LOS ERRORES

-USAR instanceof para validar clases en vez de los mensajes.. por si cambiamos el idioma de la app por ejemplo
-


export function apiErrorHandler(error, req, res, next) {
    if (error instanceof ErrorArgumentoInvalido) {
      res.status(400)
    } else if (error instanceof ErrorRecursoNoEncontrado) {
      res.status(404)
    } else {
      res.status(500)
    }
    res.json({ estado: 'error', tipo: error.tipo, descripcion: error.descripcion })
  }

*/

export function errorHandlerAPI(error, req, res , next){    
    switch (error.type) {
        case 'REGISTER_ERROR_USER_EXIST':
            res.status(409)
            break
        case 'REGISTER_ERROR':
            res.status(401)
            break
        case 'AUTHETICATION_ERROR':
            res.status(401)
            break
        case 'AUTHORIZATION_ERROR':
            res.status(403)
            break            
        case 'AUTHETICATION_EXPIRED_ERROR':
            console.log("ERROR SALLLLLLE POR AQUI?")
            res.status(401)
            break
        default:
            res.status(500)
    }
    console.log(error)
    res.json({ errorMessage: error.message })
}
/*
export function errorHandlerWEB(error, req, res , next){    
    if (error.message === 'NOT FOUND') {
        res.render("notFound", error)
       // return res.status(404).send('<H1>No encontrado</H1>')
    }
}

*/