import dotenv from 'dotenv'
dotenv.config({path: 'src/.env'});
//MONGO
export const MONGOOSE_STRING_ATLAS=`mongodb+srv://${process.env.MONGO_STRING_CON}.3iptaqr.mongodb.net/ecommerce?retryWrites=true&w=majority`
//GITHUB
export const GITHUB_APP_ID = process.env.GITHUB_APP_ID 
export const GITHUB_CLIENTE_ID = process.env.GITHUB_CLIENTE_ID  
export const GITHUB_CLIENT_SECRET =process.env.GITHUB_CLIENT_SECRET  
export const GITHUB_CALLBACK_URL =process.env.GITHUB_CALLBACK_URL   
//SECRETS
export const JWT_SECRET = process.env.JWT_SECRET  
export const COOKIE_SECRET = process.env.COOKIE_SECRET 
export const MONGO_SECRET = process.env.MONGO_SECRET

//PERSISTENCE
export const PERSISTENCE = process.env.PERSISTENCE

//ENVIROMENT
export const NODE_ENV = process.env.NODE_ENV || 'development'