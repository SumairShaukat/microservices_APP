import jwt from 'jsonwebtoken';
import {config} from '../config'



const generateToken =(userId) => {
    return jwt.sign({id: userId}, config.jwtSecret, {expiresIn: 60  * 60})
}

const verifyToken = (token) => {
    return jwt.verify(token, config.jwtSecret,)
}
export  {generateToken, verifyToken}