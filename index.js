import express from 'express'
import bodyparser from 'body-parser'
import { conn } from './db/conn.js'
import problemRoute from './Routes/Problem.route..js'
import dotenv from 'dotenv'
import UserRoute from './Routes/User.route.js'
import { config } from './config/config.js'
import cookieparser from 'cookie-parser'
import cors from 'cors'
const app=express()

//middelware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
//db
app.use(cors({
    // origin:"http://localhost:3000",
    origin:"https://neetcodex.onrender.com",
    credentials:true
}))
app.use(cookieparser())
dotenv.config()

await conn()




app.listen(process.env.PORT,()=>console.log(`server on PORT ${process.env.PORT}`))


app.use('/problem',problemRoute)
app.use('/user',UserRoute)