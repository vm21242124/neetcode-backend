import express from 'express'
import bodyparser from 'body-parser'
import { conn } from './db/conn.js'
import problemRoute from './Routes/Problem.route..js'
import dotenv from 'dotenv'
import UserRoute from './Routes/User.route.js'
import { config } from './config/config.js'
import cookieparser from 'cookie-parser'
const app=express()

//middelware
app.use(cookieparser())
dotenv.config()
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
//db
await conn()




app.listen(5000,()=>console.log("server on"))


app.use('/problem',problemRoute)
app.use('/user',UserRoute)