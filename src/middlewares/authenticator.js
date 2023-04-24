export function authenticator( req, res, next){
    if(req.session.user){
        console.log("AQUI DEBO PONER VALIDACION DE ROOOOLES")
        next()
    }else{
        res.redirect("/api/users/login")
    }
}