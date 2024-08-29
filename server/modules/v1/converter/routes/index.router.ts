import { Router } from "express";
import convert from "../controllers/convert.controller";

const converterRouter = Router();

converterRouter.post('/convert', convert)


export default converterRouter