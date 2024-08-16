import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { connectDB } from './db/database.js'
import { router } from './routes/estudian.routes.js'

const app = express()

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(router)

//base de datos
connectDB()

//configuraciones
app.set("port", process.env.PORT || 5000)

//servidor
app.listen(app.get("port"), () => {
    console.log(`SERVIDOR ANDANDO EN EL PUERTO ${app.get("port")}`)
})