import express from 'express';
import { loginUser,refresh } from '../controllers/authController.js';
const authRoute = express.Router();

authRoute.post('/login',loginUser)
authRoute.post('/refresh',refresh)

export default authRoute;