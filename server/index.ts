import express from 'express';
import router from './modules/v1/common/routes/index.route'
import dotenv from 'dotenv'
import mongoDB from './modules/v1/common/config/dataBase/mongodb'
dotenv.config()


const PORT = process.env.SERVER_PORT || 3000 ;

const app = express();

app.use(express.json({
    limit: '5mb'
}))
app.use('/', router)


app.listen(PORT, ()=>{
    console.log(`Servidor abierto en \n http://localhost:${PORT}`)
})