import pool from "../config/db.js";
import { hashPass } from "../Utils/PasswordHash.js";

export const createUser = async(req,res) => {
    const {name,email,password,username,age,usertype} = req.body;

    try{
        //check user exist
        const checkQuery = 'SELECT email,username FROM users WHERE email = ? OR username = ?';
        const [emailChecker] = await pool.query(checkQuery,[email,username]);
        
        if(emailChecker.length > 0){
            const user = emailChecker[0];
            
            if(user.email === email){
                return res.status(400).json({message : 'account exist please login'})
            }
            if(user.username === username){
                return res.status(400).json({message : 'that username is already exist'})
            }
        }

        //hasing password
        const hashed = await hashPass(password)
        
        //inserting user
        const sql = 'INSERT INTO users (name,email,password,username,age,usertype) VALUES (?,?,?,?,?,?);'
        const value = [name,email,hashed,username,age,usertype];

        const [result] = await pool.query(sql,value)

        res.status(201).json({message : 'new user is a created', userId : result.insertId})
    }catch(error){
        console.log('there is error',error)
        res.status(500).json({message : 'something went wrong please try again',error})
    }
    
}

export const getUser = async(req,res) => {
    
    try{
        const allSelectQuery = 'SELECT id,name,email,username,usertype FROM users';

        const [result] = await pool.query(allSelectQuery);
    
        if(result.length === 0){
            return res.status(200).json({message : 'there is no user exist', result : []})
        }
    
        res.status(200).json({message : 'all user list',result}) 
    }catch(error){
        res.status(500).json({message : 'server error',error})
    }
    
}

export const updateUser = async(req,res) => {
    const {id} = req.params;
    const {name,username,age} = req.body

    if(!id){
        return res.status(400).json({message : 'please enter id'})
    }

    try{
        const userFindQuery = 'SELECT id,name,username,age FROM users WHERE id = ?';

        const [findUser] = await pool.query(userFindQuery,[id])
        if(!findUser.length > 0){
            return res.status(400).json({message : 'user not exist'})
        }

        const updateQuery = 'UPDATE users SET name = ?,username = ?,age = ? WHERE id = ?';
        const value = [name || findUser[0].name,username || findUser[0].username, age|| findUser[0].age,id]
        console.log(value)

        const [updateUser] = await pool.query(updateQuery,value)
        if(updateUser.affectedRows === 0){
            return res.status(400).json({message : 'sorry user not updated'})
        }

        res.status(200).json({message : 'user updated successfully',data : updateUser})

    }catch(error){
        return res.status(500).json({message : 'something wrong please try again leter',error})
    }
}

export const deleteUser = async(req,res) => {
    const {id} = req.params;

    if(!id){
        return res.status(400).json({message : 'please enter id'})
    }

    try {
        const deleteQuery = 'DELETE FROM users WHERE id = ?'

        const [deleteUser] = await pool.query(deleteQuery,[id]);

        if(deleteUser.affectedRows === 0){
            return res.status(200).json({ message: 'user not deleted'});
        }

        res.status(200).json({ message: 'user delete successfully'});
    } catch (error) {
        console.log('error in user delete route',error);
        res.status(500).json({ message: 'server error',error});
    }
}
