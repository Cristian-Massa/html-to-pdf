import { Db, MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

class DataBase{
  private static instance: DataBase;
  private db: Db | null = null;
  private url: string | undefined;
  private constructor(){
    this.url = process.env.MONGO_CREDENTIALS;
  }

  public static async getInstance(){
    if(!DataBase.instance){
      DataBase.instance = new DataBase()
      await DataBase.instance.connect()
    }
    return DataBase.instance
  };

  private async connect(){
    if(!this.url) throw new Error("No se pudo encontrar el enlace a la base de datos")
    const client = new MongoClient(this.url)
    await client.connect();
    this.db = client.db("users");
  };

  public getDb(){
    if(!this.db) throw new Error("No se encontro la base de datos")
    return this.db
  };
}

export default DataBase