export function authenticator( req, res, next){
    if (req.session.passport || req.session.user){        
        next()
    } else {
        res.redirect('/api/users/login')
    }    
}
