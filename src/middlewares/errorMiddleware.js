// ENVIAR LOGICA DE MANEJO DE ERRORES A UN MIDLEWARE SEPARADO..
export function errorMiddleware(error, req, res , next){    
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
        default:
            res.status(500)
    }
    console.log(error)
    res.json({ errorMessage: error.message })
}
