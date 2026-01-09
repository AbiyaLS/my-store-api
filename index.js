import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import productsRoutes from "../shop/routes/productRoutes.js"
import userRoutes from "../shop/routes/user_routes.js"
// import userProductRoutes from "../shop/routes/user_product_routes.js"
import reviewRoutes from "../shop/routes/review_routes.js"
import cors from "cors"

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())


const PORT = process.env.PORT || 5000
const MONGOURL =process.env.MONGO_URL

app.use("/product",productsRoutes)
// app.use("/user",userRoutes)
// app.use("/userProduct",userProductRoutes)
// app.use("/review",reviewRoutes)

mongoose.connect(MONGOURL).then(()=>{
    console.log("Database connected")
    app.listen(PORT,()=>{
        console.log(`Server connect at port ${PORT}`)
    })
}).catch((err)=>{
    console.log("ERROR OCCURS",err)
})