import pool from "../config/db.js"
import { verifyPass } from "../Utils/PasswordHash.js";
import {accessGenerate,refreshGenerate,accessVerify,refreshVerify} from "../config/tokenGeneration.js";


export const loginUser = async(req,res) => {
    const {email,password} = req.body

    try {
        const findQuery = `SELECT * FROM users WHERE email = ?`;
        const value = [email]

        const [findUser] = await pool.query(findQuery,value);

        if(!findUser.length > 0){
            return res.status(400).json({ message: 'email or password is wrong' });
        }

        const isValidPass = await verifyPass(password,findUser[0].password)

        if(!isValidPass){
            return res.status(400).json({ message: 'email or password is wrong' });
        }

        const generateAccessToken = await accessGenerate({id:findUser[0].id, role:findUser[0].usertype, ip : req.ip, browser : req.headers['user-agent']})
        const generateRefreshToken = await refreshGenerate({id:findUser[0].id, role:findUser[0].usertype, ip : req.ip, browser : req.headers['user-agent']})

        res.cookie('refreshToken',generateRefreshToken,{
            httpOnly : true,
            secure : true,
            sameSite : "Strict",
            maxAge : 7 * 24 * 60 * 60 * 1000
        })


        res.status(200).json({ message: 'you are logged in !',accessToken : generateAccessToken });
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'server side error'})
    }
}

export const refresh = async(req,res) => {

    try {
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken){
            return res.status(400).json({ message: 'refresh token not found, Login please' });
        }

        const isValid = await refreshVerify(refreshToken);
        
        if(!isValid) return res.status(400).json({ message: 'please login you token is expire' });
        req.user = isValid;
        
        const newAccessToken = await accessGenerate(isValid);

        res.status(200).json({ message: 'new access token is a generated',newAccessToken });
    } catch (error) {
        console.error('refresh route error :',error);
        if(error.message === 'token expire'){
            res.status(401).json({ message: 'token is a expire please login again' });
        }
        res.status(500).json({ message: 'server error in a refresh controller' });
    }
    
}