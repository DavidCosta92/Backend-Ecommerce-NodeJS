// @ts-nocheck
import passport from 'passport'
import { AuthenticationError } from "../entities/error/authenticationError.js"
import { encrypter } from '../utils/encrypter.js'
import { User_dao_mongo_manager } from '../managers/mongoose/UserManager.js'
// imports LOCAL
import { Strategy as LocalStrategy } from 'passport-local'
// imports GITHUB
import { Strategy as GithubStrategy } from 'passport-github2'
import {GITHUB_CALLBACK_URL,GITHUB_CLIENT_SECRET, GITHUB_CLIENTE_ID } from '../config/config.js'
import { DB_mongo_cart_manager } from '../managers/mongoose/database.cart.Manager.js'

passport.use('local', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    const user = await User_dao_mongo_manager.searchByEmail(username)
    if (!user)
        return done(new AuthenticationError("Error de logueo, revisa las credenciales"))
    if (!encrypter.comparePasswords(password, user.password))
        return done(new AuthenticationError("Error de logueo, revisa las credenciales"))
    delete user.password
    done(null, user)
}))

passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, _u, _p, done) => {
    try {
        const idNewCart = await DB_mongo_cart_manager.createCart(done)
        
        const user = {role: "user", cart: idNewCart, ...req.body }
        if ( user.email === "adminCoder@coder.com" && user.password === "adminCod3r123") user.role = "admin"
        const {newUser} = await User_dao_mongo_manager.createUser({user})
        /* para guardar session y loguear a la vez*/
        req.session.user = {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            age: newUser.age,
            cart: newUser.cart,
            role : newUser.role
        }
        done(null, newUser)
      } catch (error) {
        done(error)
      }
    }
))

passport.use('github', new GithubStrategy({
    clientID: GITHUB_CLIENTE_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    let user = await User_dao_mongo_manager.searchByGitHubUsername(profile.username);   
    if(user === null){

    const idNewCart = await DB_mongo_cart_manager.createCart(done)
        user = {
            email : profile.username ,
            password  : "",
            first_name : profile.displayName , 
            last_name  : profile.displayName ,
            cart : idNewCart,
            age  : 0,
            role : "usuario"
        } 
        user = await User_dao_mongo_manager.createGitHubUser({user});
    } 
    let userGit = await User_dao_mongo_manager.searchByGitHubUsername(profile.username);   
    done(null, userGit)
}))

// esto lo tengo que agregar para que funcione passport! copiar y pegar, nada mas.
passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

// estos son para cargar en express como middlewares a nivel aplicacion
export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

// estos midlewares son para cada url de github y los otros para la estrategia local
export const authLocal = passport.authenticate('local', { failWithError: true })  // PARA JWT, AL ELIMINAR TODO LO DE SESSION, ESTAS CONFIG DEBERAN LLEVAR session en false ('local', { session:false ,failWithError: true }) 
export const authLocalRegister = passport.authenticate('register', { failWithError: true })  // PARA JWT, AL ELIMINAR TODO LO DE SESSION, ESTAS CONFIG DEBERAN LLEVAR session en false ('local', { session:false ,failWithError: true }) 
export const authGithub = passport.authenticate('github', { scope: ['user:email'] })  // PARA JWT, AL ELIMINAR TODO LO DE SESSION, ESTAS CONFIG DEBERAN LLEVAR session en false ('local', { session:false ,failWithError: true }) 
export const callbackAuthGithub = passport.authenticate('github', { failWithError: true })   // PARA JWT, AL ELIMINAR TODO LO DE SESSION, ESTAS CONFIG DEBERAN LLEVAR session en false ('local', { session:false ,failWithError: true }) // { failWithError: true } => en caso de que falle deberia llamar al next()
