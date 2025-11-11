import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        trim: true,
    },
    price:{
        type:Number,
        required: true,
    },
    category:{
        type:String,
        lowercase:true
    },
    description:{
        type:String,
        required:true
    },
    instock:{
        type: Boolean,
        required: true
    },
})

const Product =mongoose.model("Product",productSchema)
export default Product