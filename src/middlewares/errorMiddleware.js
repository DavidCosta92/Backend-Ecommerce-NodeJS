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