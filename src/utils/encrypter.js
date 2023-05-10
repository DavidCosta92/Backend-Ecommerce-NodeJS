import bcrypt from 'bcrypt'
import { JWT_SECRET } from '../config/auth.config.js'
import jwt from 'jsonwebtoken'
import { AuthenticationExpiredError } from '../entities/error/authenticationError.js'

class Encrypter {
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }

    comparePasswords(attepm, real) {
        return bcrypt.compareSync(attepm, real)
    }

    createToken(data) {
        return jwt.sign(data, JWT_SECRET, { expiresIn: '1h' })
      }

    getDataFromToken(token) {
        try {
          return jwt.verify(token, JWT_SECRET)
        } catch (error) {
          console.log(error)
          new AuthenticationExpiredError(error) 
        }
    }    
}

export const encrypter = new Encrypter()