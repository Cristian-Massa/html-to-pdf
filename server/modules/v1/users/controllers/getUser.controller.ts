import { Request, Response } from "express";
import DataBase from "../../common/config/dataBase/mongodb";
import { ObjectId } from "mongodb";
import { db } from "../../../..";

export default async function getUser(req: Request, res: Response){
    try {
        const {id} = req.query;
        
        const collection = await db.collection('users')

        const user = await collection.findOne({
            _id: new ObjectId(id?.toString())
        },{
            projection:{
                password: 0
            }
        })
        
        if(!user) return res.status(404).json({ error: "No se encontro el usuario"}) 
        return res.status(200).json({ success: user})
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message})
    }
}