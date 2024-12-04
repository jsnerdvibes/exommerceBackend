import express  from "express"
import 'dotenv/config'
import './Models/db.js'
import bodyParser from "body-parser"
import cors from "cors"
import { router } from "./Routers/AuthRouter.js"

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/auth',router)

let PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`server listning on http://localhost:${PORT}`)
})

app.get('/',(req,res)=>{
    res.send("Server is Up")
})

