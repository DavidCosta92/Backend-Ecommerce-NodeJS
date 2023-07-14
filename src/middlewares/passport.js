// @ts-nocheck
import passport from 'passport'
import { userRepository } from '../repositories/userRepository.js'
// imports GITHUB
import { Strategy as GithubStrategy } from 'passport-github2'
import {GITHUB_CALLBACK_URL,GITHUB_CLIENT_SECRET, GITHUB_CLIENTE_ID } from '../config/config.js'
import { cartRepository } from '../repositories/cartRepository.js'
import { GithubUser} from '../models/User.js'


passport.use('github', new GithubStrategy({
    passReqToCallback: true,
    clientID: GITHUB_CLIENTE_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL,
}, async (req,res,accessToken, refreshToken, profile, done) => {
    let user = await userRepository.searchByGitHubUsername(profile.username);   
    if(user === null){
    const idNewCart = await cartRepository.postCart(done)
        const dataUser = {
            username : profile.username,
            cart : idNewCart,
            role : "user"
        }        
        const newGithubUser = new GithubUser(dataUser)
        user = await userRepository.createGitHubUser(newGithubUser.getAllAttr());
    } 
    // MANEJO DE SESSIONS MEDIANTE JWT EN COOKIES.. SESSIONS DE PASSPORT ESTAN EN FALSE.
    req.usernameGithub =user.username // creo esta propiedad para obtener el valor en el proximo midd
    done(null, user)
}))

// esto lo tengo que agregar para que funcione passport! copiar y pegar, nada mas.
passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

// estos son para cargar en express como middlewares a nivel aplicacion
export const passportInitialize = passport.initialize()
export const passportSession = passport.session() // ES OPCIONAL => Lo que hace, es usar una cookie para que express junto con passport, manejen las sessiones con cookies.. si quisiera usar otra forma de session o jwt, no hace falta cargarlo"!

export const authGithub = passport.authenticate('github', { scope: ['user:email'] })
export const callbackAuthGithub = passport.authenticate('github', {  session:false ,failWithError: true }) 
