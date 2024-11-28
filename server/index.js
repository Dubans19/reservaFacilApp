import express from "express"
import dotenv from 'dotenv';
import authRouter from "./routes/auth.js"
dotenv.config();
import cors from "cors"
import propiedadesRouter from "./routes/propiedades.js";

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use("/uploads", express.static("public/uploads"));
app.use("/", authRouter,propiedadesRouter)
app.get("/prueba", (req, res) => {
    res.json("endpoint prueba nuevos")
})
const PORT = 3000
app.listen(PORT, () => console.log("Servidor en el puerto " + PORT))

