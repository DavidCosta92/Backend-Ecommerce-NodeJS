// @ts-nocheck
import passport from 'passport'
import { AuthenticationError } from "../entities/error/authenticationError.js"
import { userManager } from '../managers/UserManager.js'
import { comparePasswords } from '../utils/encrypter.js'
// imports LOCAL
import { Strategy as LocalStrategy } from 'passport-local'
// imports GITHUB
import { Strategy as GithubStrategy } from 'passport-github2'
import { githubCallbackUrl, githubClientSecret, githubClienteId } from '../config/auth.config.js'



passport.use('local', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    const user = await userManager.searchByEmail(username)
    if (!user)
        return done(new AuthenticationError())
    if (!comparePasswords(password, user.password))
        return done(new AuthenticationError())
    delete user.password
    done(null, user)
}))

passport.use('register', new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' }, async (req, _u, _p, done) => {
      try {
        const { email, password, age, first_name, last_name } = req.body
        const { user } = await userManager.createUser({ email, password, age, first_name, last_name })
  
        done(null, user)
      } catch (err) {
        done(err.message)
      }
    }
))

passport.use('github', new GithubStrategy({
    clientID: githubClienteId,
    clientSecret: githubClientSecret,
    callbackURL: githubCallbackUrl,
}, async (accessToken, refreshToken, profile, done) => {
    let user = await userManager.searchByEmail(profile.username);    
    if(user === null){
        user = {
            email : profile.username ,
            password  : "",
            first_name : profile.displayName,
            last_name  : profile.displayName,
            age  : 0,
            rol : "usuario"
        } 
        await userManager.createUser({user});
    } 
    done(null, user)
}))


// esto lo tengo que agregar para que funcione passport! copiar y pegar, nada mas.
passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

// estos son para cargar en express como middlewares a nivel aplicacion
export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

// estos midlewares son para cada url de github y los otros para la estrategia local
export const authLocal = passport.authenticate('local', { failWithError: true })
export const authLocalRegister = passport.authenticate('register', { failWithError: true })
export const authGithub = passport.authenticate('github', { scope: ['user:email'] })
export const callbackAuthGithub = passport.authenticate('github', { failWithError: true }) // { failWithError: true } => en caso de que falle deberia llamar al next()
