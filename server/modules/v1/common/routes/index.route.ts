import { Router } from "express";
import userRouter from "../../users/routes/index.router";
import converterRouter from "../../converter/routes/index.router";

const router = Router()

router.use('/v1/users', userRouter)
router.use('/v1/converter', converterRouter)


export default router