import pool from "../config/db.js"
import { verifyPass } from "../Utils/PasswordHash.js";

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

        res.status(200).json({ message: 'you are logged in !' });
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'server side error'})
    }
}