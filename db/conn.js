import mongoose from "mongoose";
import { config } from "../config/config.js";

export const conn=async()=>{
    try {
        mongoose.connect(process.env.DB).then(()=>console.log("connected to database")).catch(e=>console.log(e.message))
    } catch (e) {
        console.log(e.message);
    }
}