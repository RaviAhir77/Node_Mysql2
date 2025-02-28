import jwt from 'jsonwebtoken';

const accessSecret = 'super_hard_to_crack'
const refreshSecret = 'very_hard_to_Know'

export const accessGenerate = async(user) => {
    return jwt.sign({ id : user.id, role : user.role, ip : user.ip, browser : user.browser }, accessSecret, { expiresIn: '15m' })
}

export const refreshGenerate = async(user) => {
    return jwt.sign({ id : user.id, role : user.role, ip : user.ip, browser : user.browser }, refreshSecret, { expiresIn: '7d' })
}

export const accessVerify = async(token) => {
    try {
        return jwt.verify(token,accessSecret)
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
            throw{name : 'TokenExpiredError' , message : 'token is a exipred !!'};
        }
        throw new Error("invalid token");
    }
}

export const refreshVerify = async(token) => {
    try{
        return jwt.verify(token,refreshSecret)
    }catch(error){
        if(error.name === 'TokenExpiredError'){
            throw new Error("token expire");
        }
        throw new Error("invalid token");
    }
    
}