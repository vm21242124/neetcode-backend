import mongoose from "mongoose";


export const conn=async()=>{
    try {
        mongoose.connect(process.env.DB).then(()=>console.log("connected to database")).catch(e=>console.log(e.message))
    } catch (e) {
        console.log(e.message);
    }
}