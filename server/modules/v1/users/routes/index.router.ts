import { Router } from "express";
import login from "../controllers/login.controller";
import register from "../controllers/register.controller";
import getUser from "../controllers/getUser.controller";

const userRouter = Router()

userRouter.post('/register', register)

userRouter.post('/login', login)

userRouter.get('/getUser', getUser)

export default userRouter