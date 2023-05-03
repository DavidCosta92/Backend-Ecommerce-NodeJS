import bcrypt from 'bcrypt'

export function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export function comparePasswords(attepm, real) {
    return bcrypt.compareSync(attepm, real)
}