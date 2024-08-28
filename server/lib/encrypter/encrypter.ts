import bcrypt from 'bcrypt'

export default class Encrypter{
    salts: number;
    
    constructor(){
        this.salts = 10

    }
    encrypt(text: string): string{
        const hash = bcrypt.hashSync(text, this.salts)
        return hash
    }

    async decrypt(textStored: string, text: string): Promise<boolean>{
        console.log(text, textStored);
        
        const compare = await bcrypt.compare(text, textStored)
        console.log(compare);
        
        return compare
    }
}