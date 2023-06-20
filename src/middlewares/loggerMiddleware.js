import { winstonLogger } from "../utils/logger.js";

export const logger = (req ,res , next) =>{
    req.logger = winstonLogger
    next()
}