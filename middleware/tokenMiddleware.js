import { accessVerify } from "../config/tokenGeneration.js";


export const tokenMiddleware = async(req,res,next) => {

    try {
        const headToken = req.headers['authorization'];
        const token = headToken && headToken.split(' ')[1]
        
        if(!token){
            return res.status(400).json({ message: 'token not found in a header' });
        }
    
        const isValid = await accessVerify(token)
        
        
        req.user = isValid;
        next()   
    } catch (error) {
        console.error(error)
        res.status(500).json({message : 'server error in middeware'})
    }
   
}