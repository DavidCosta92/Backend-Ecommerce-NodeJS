// @ts-nocheck
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthenticationExpiredError } from '../models/errors/authentication.error.js'

class Encrypter {
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }

    comparePasswords(attepm, real) {
        return bcrypt.compareSync(attepm, real)
    }

    createToken(data) {
        return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' })
      }

    getDataFromToken(token) {
        try {
          return jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
          console.log(error)
          new AuthenticationExpiredError(error) 
        }
    }    
    createTokenToRestorePassword(data){
      return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '3600s' })
    }
}

export const encrypter = new Encrypter()