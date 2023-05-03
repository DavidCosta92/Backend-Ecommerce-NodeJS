import bcrypt from 'bcrypt'
/*
export function hashear(frase) {
    return bcrypt.hashSync(frase, bcrypt.genSaltSync(10))
}
*/
export function comparePasswords(attepm, real) {
    return bcrypt.compareSync(attepm, real)
}