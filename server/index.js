import express from "express"
import dotenv from 'dotenv';
import authRouter from "./routes/auth.js"
dotenv.config();
import cors from "cors"

const app= express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use("/",authRouter)
app.get("/traer",(req,res)=>{
    res.json("endpoint prueba")
})
const PORT=3000
app.listen(PORT,()=>console.log("Servidor en el puerto "  +  PORT))

