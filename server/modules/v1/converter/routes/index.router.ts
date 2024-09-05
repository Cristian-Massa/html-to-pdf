import { Router } from "express";
import convert from "../controllers/convert.controller";
import creditMidleware from "../middlewares/credits.midleware";

const converterRouter = Router();

converterRouter.use('/convert', creditMidleware)

converterRouter.post('/convert', convert)


export default converterRouter