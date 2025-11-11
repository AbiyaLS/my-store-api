import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import productsRoutes from "../shop/routes/productRoutes.js"

const app = express()

app.use(express.json())
dotenv.config()

const PORT = process.env.PORT || 5000
const MONGOURL =process.env.MONGO_URL

app.use("/product",productsRoutes)

mongoose.connect(MONGOURL).then(()=>{
    console.log("Database connected")
    app.listen(PORT,()=>{
        console.log(`Server connect at port ${PORT}`)
    })
}).catch((err)=>{
    console.log("ERROR OCCURS",err)
})