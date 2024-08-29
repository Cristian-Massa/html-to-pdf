import { BSONType, Db, MongoClient } from "mongodb";
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
    await this.createCollection()    
  };

  public getDb(){
    if(!this.db) throw new Error("No se encontro la base de datos")
    return this.db
  };

  private async createCollection(){
    if(!this.db) throw new Error("No se encontro la base de datos")
    
    const collections = await this.db.listCollections({ name: "users"}).toArray()

    console.log(collections);
    if(collections.length) return
    
      try {
      await this.db?.createCollection("users", {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ['name', 'email', 'phone', 'role'],
            properties:{
              name: {
                bsonType: "string",
                description: "Debe de ingresar el nombre"
              },
              email: {
                bsonType: "string",
                pattern: "^.+@.+$",
                description: "Debe de ingresar el correo electronico"
              },
              phone: {
                bsonType: "string",
                description: "Debe de ingresar el telefono"
              },
              role: {
                bsonType: "int",
                description: "Debe de ingresar el rol del usuario"
              },
              credits: {
                bsonType: "int",
                description: "Debe de ingresar los creditos del usuario"
              },
            }
          }
        }
      })
    } catch (error) {
      console.error((error as Error).message)
      throw error
    }
  }
}

export default DataBase