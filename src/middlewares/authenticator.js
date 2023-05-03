import { AuthorizationError } from "../entities/error/authorizationError.js"
export function authenticator( req, res, next){
    if (!req.session.passport) {
        console.log('peticion de un usuario sin autenticarse, se redirige a la pagina de login')
        res.redirect('/login') /// aca hay un problema, me envia mal a la siguiente pagina.. el error? me duplica la direcion.. por? porque debe estar 
    }
    next()



/*
    if (!req.isAuthenticated()) {
        // console.log('peticion de un usuario sin autenticarse, se redirige a la pagina de login')
        return res.redirect('/login')
    }
    // console.log('peticion de un usuario autenticado! se redirige a la pagina de inicio')
    next()
*/
    
    /*
    if(req.session.user){
        console.log("AQUI DEBO PONER VALIDACION DE ROOOOLES")
        next()
    }else{
        res.redirect("/api/users/login")
    }
    */



    /*
    cambiar metodo de arriba, por el de abajo, que es el que provee passport.. hacen lo mismo basicamente...
    
    // acá uso el atajo que me provee passport para ver
    // si hay una sesion inicializada por un usuario
    if (!req.isAuthenticated()) {
        //     console.log('peticion de un usuario sin autenticarse, se lanza error')
        return next(new ErrorDePermisos())
    }
    // console.log('peticion de un usuario autenticado! continua el flujo normal del caso de uso')
    next()

    */
    next()
}


/*

AGREGAR FUNCIONALIDAD CON ESTOS MIDLEWARES... PARA QUE REDIRECCIONE A LOGIN EN CASO DE QUERE PASAR Y NO ESTAR AUTHENTICADOS

export function soloLogueadosApi(req, res, next) {
    // acá uso el atajo que me provee passport para ver
    // si hay una sesion inicializada por un usuario
    if (!req.isAuthenticated()) {
        //     console.log('peticion de un usuario sin autenticarse, se lanza error')
        return next(new ErrorDePermisos())
    }
    // console.log('peticion de un usuario autenticado! continua el flujo normal del caso de uso')
    next()
}

export function soloLogueadosView(req, res, next) {
    // acá uso el atajo que me provee passport para ver
    // si hay una sesion inicializada por un usuario
    if (!req.isAuthenticated()) {
        // console.log('peticion de un usuario sin autenticarse, se redirige a la pagina de login')
        return res.redirect('/login')
    }
    // console.log('peticion de un usuario autenticado! se redirige a la pagina de inicio')
    next()
}


*/