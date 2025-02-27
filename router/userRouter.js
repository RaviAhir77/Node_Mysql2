import {createUser,deleteUser,getUser,updateUser} from "../controllers/userController.js";
import express from 'express';
import { validateSchema } from "../middleware/joiMiddleware.js";
import { joiCreateUser,joiUpdateUser } from "../Validation/userValidation.js";

const userRouter = express.Router();

userRouter.post('/create-user',validateSchema(joiCreateUser),createUser);
userRouter.get('/all-user',getUser);
userRouter.put('/update-user/:id',validateSchema(joiUpdateUser),updateUser);
userRouter.delete('/delete-user/:id',deleteUser)
export default userRouter;