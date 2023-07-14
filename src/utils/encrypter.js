// @ts-nocheck
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthenticationExpiredErrorWEB } from '../models/errors/authentication.error.js'
import { winstonLogger } from './logger.js'

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
          winstonLogger.error(error)
          throw new AuthenticationExpiredErrorWEB(error) 
        }
    }    
    createTokenToRestorePassword(data){
      return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '3600s' })
    }
}
export const encrypter = new Encrypter()