import { Router } from "express";
import userRouter from "../../users/routes/index.router";

const router = Router()

router.use('/v1/users', userRouter)



export default router