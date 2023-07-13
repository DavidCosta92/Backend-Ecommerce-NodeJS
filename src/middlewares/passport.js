// @ts-nocheck
import passport from 'passport'
import { AuthenticationError } from '../models/errors/authentication.error.js'
import { encrypter } from '../utils/encrypter.js'
import { userRepository } from '../repositories/userRepository.js'
// imports LOCAL
import { Strategy as LocalStrategy } from 'passport-local'
// imports GITHUB
import { Strategy as GithubStrategy } from 'passport-github2'
import {GITHUB_CALLBACK_URL,GITHUB_CLIENT_SECRET, GITHUB_CLIENTE_ID } from '../config/config.js'
import { cartRepository } from '../repositories/cartRepository.js'
import { GithubUser, User } from '../models/User.js'
import { userService } from '../services/userService.js'

passport.use('local', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {

    try {
        const user = await userRepository.searchByEmail(username)
        if (!user)
            return done(new AuthenticationError("Error de logueo, revisa las credenciales"))
        if (!encrypter.comparePasswords(password, user.password))
            return done(new AuthenticationError("Error de logueo, revisa las credenciales"))
        delete user.password
        done(null, user) /*dedjarlo logueado con passport*/
    } catch (error) {        
        done(error)
    }
}))


// ESTA ESTRATEGIA NO LA VOY A USAR, ES PREFERIBLE DESDE USERSERVICE LLAMAR A CREAR USUSARIO Y LUEGO LLAMAR A req.login() => para poder iniciar sesion con passport y mantener separadas las capas y que pssport no se encarge de crear usuarios nuevos
//passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, _u, _p, done) => {
//    try {
//        let {first_name, last_name, email, age, password} = {...req.body}
//        const {newUser, code} = await userService.createUser({first_name, last_name, email, age, password})
//        /* para guardar session y loguear a la vez*/
//        // ESTA PARTE ES NECESARIA?
//       // req.session.user = {
//       //     first_name: newUser.first_name,
//       //     last_name: newUser.last_name,
//       //     email: newUser.email,
//       //     age: newUser.age,
//       //     cart: newUser.cart,
//       //     role : newUser.role
//       // }
//        done(null, newUser)/* para registrar al user y dedjarlo logueado a la vez  con passport*/
//      } catch (error) {
//        done(error)
//      }
//    }
//))

passport.use('github', new GithubStrategy({
    clientID: GITHUB_CLIENTE_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
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
    // let userGit = await userRepository.searchByGitHubUsername(profile.username);   
    done(null, user)
}))

// esto lo tengo que agregar para que funcione passport! copiar y pegar, nada mas.
passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

// estos son para cargar en express como middlewares a nivel aplicacion
export const passportInitialize = passport.initialize()
export const passportSession = passport.session() // ES OPCIONAL => Lo que hace, es usar una cookie para que express junto con passport, manejen las sessiones con cookies.. si quisiera usar otra forma de session o jwt, no hace falta cargarlo"!


// estos midlewares son para cada url de github y los otros para la estrategia local
export const authLocal = passport.authenticate('local', {failWithError: true })  // PARA JWT, AL ELIMINAR TODO LO DE SESSION, ESTAS CONFIG DEBERAN LLEVAR session en false ('local', { session:false ,failWithError: true }) 
export const authLocalRegister = passport.authenticate('register', { failWithError: true })  // PARA JWT, AL ELIMINAR TODO LO DE SESSION, ESTAS CONFIG DEBERAN LLEVAR session en false ('local', { session:false ,failWithError: true }) 
export const authGithub = passport.authenticate('github', { scope: ['user:email'] })  // PARA JWT, AL ELIMINAR TODO LO DE SESSION, ESTAS CONFIG DEBERAN LLEVAR session en false ('local', { session:false ,failWithError: true }) 
export const callbackAuthGithub = passport.authenticate('github', {  failWithError: true })   // PARA JWT, AL ELIMINAR TODO LO DE SESSION, ESTAS CONFIG DEBERAN LLEVAR session en false ('local', { session:false ,failWithError: true }) // { failWithError: true } => en caso de que falle deberia llamar al next()
