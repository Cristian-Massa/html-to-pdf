import DataBase from "./mongodb";

export default class Initializer{
    db: Promise<DataBase>;
    constructor(){
        this.db = DataBase.getInstance()
    }

    async collection(collectionRef: string){
        if(!collectionRef) throw Error("debes ingresar el nombre de la coleccion")
        const collection = (await this.db).getDb().collection(collectionRef)
        return collection
    }
}