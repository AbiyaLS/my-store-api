import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser" 
import productsRoutes from "../backend/routes/productRoutes.js"
import authRoutes from "../backend/routes/auth/authRoutes.js"


const app = express()
dotenv.config()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 5000
const MONGOURL =process.env.MONGO_URL

app.use("/product",productsRoutes)
app.use("/",authRoutes)

mongoose.connect(MONGOURL).then(()=>{
    console.log("Database connected")
    app.listen(PORT,()=>{
        console.log(`Server connect at port ${PORT}`)
    })
}).catch((err)=>{
    console.log("ERROR OCCURS",err)
})