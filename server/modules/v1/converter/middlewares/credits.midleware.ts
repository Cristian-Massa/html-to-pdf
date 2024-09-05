import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
export default function creditMidleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers.cookie?.split('=').at(-1);
    const decrypt = jwt.verify(token!, process.env.JWT_ACCESS_TOKEN!);

    if(typeof decrypt !== 'object') throw Error("No existe el objeto");
        
    if(!token) return res.status(401).json({error: "Debes iniciar sesion."});
    
    const now = Math.floor(Number(Date.now()) / 1000);

    if(decrypt.iat! > now) return res.status(401).json({error: "El token ha expirado debes iniciar sesion devuelta para validar tu identidad."});
    
    
    next();
}

