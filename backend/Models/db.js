import mongoose from "mongoose";
import 'dotenv/config'

let DBURI = process.env.DBURI

mongoose.connect(DBURI)
.then(()=>{
    console.log("Database Connected")
})
.catch((error)=>{
    console.log(`Error : ${error}`)
})