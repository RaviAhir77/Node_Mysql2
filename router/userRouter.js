import {createUser,deleteUser,getUser,updateUser} from "../controllers/userController.js";
import express from 'express';

const userRouter = express.Router();

userRouter.post('/create-user',createUser);
userRouter.get('/all-user',getUser);
userRouter.put('/update-user/:id',updateUser);
userRouter.delete('/delete-user/:id',deleteUser)
export default userRouter;