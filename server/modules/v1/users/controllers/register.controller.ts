import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import Encrypter from '../../../../lib/encrypter/encrypter'
import DataBase from "../../common/config/dataBase/mongodb";
import { Roles } from "../../common/enums/roles.enum";
import {db} from '../../../../index'
export default async function register(req: Request, res: Response){
    try {
        const body = req.body
        const encrypt = new Encrypter()
        if(!body.email) return res.status(401).json({ error: "falto el correo electronico"})
            
        if(!body.password) return res.status(401).json({ error: "falto la contraseña"})
        
        const users = await db.collection('users')
        const generate = await users.insertOne({
            name: body.name,
            email: body.email,
            phone: body.phone,
            password: encrypt.encrypt(body.password),
            role: Roles.user,
            credits: 10
        })
        if(!generate) return res.status(400).json({ error: "No se pudo crear el usuario"})
        res.cookie('session', jwt.sign({
            id: generate.insertedId,
            role: Roles.user
        }, process.env.JWT_ACCESS_TOKEN!), {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(Date.now() + 604800000)
        })
        return res.status(200).json({ success: "Usuario creado"})

    } catch (error) {
        return res.status(500).json({ error: (error as Error)})
    }
}