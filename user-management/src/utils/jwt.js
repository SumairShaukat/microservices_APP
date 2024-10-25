import jwt from 'jsonwebtoken';
import {jwtSecret }from '../config/index.js'



const generateToken =(userId) => {
    return jwt.sign({id: userId}, jwtSecret, {expiresIn: 60  * 60})
}

const verifyToken = (token) => {
    return jwt.verify(token, jwtSecret,)
}
export  {generateToken, verifyToken}