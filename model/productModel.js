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
        min:[0,"Price Must be positive number"]
    },
    category:{
        type:String,
        lowercase:true,
        trim: true,
        default: "general"
    },
    description:{
        type:String,
        required:true,
        trim: true,
    },
    instock:{
        type: Boolean,
        required: true
    },
    createdAt: {
    type: Date,
    default: Date.now
  },

//   connect product and user
    user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
    }
})

const Product =mongoose.model("Product",productSchema)
export default Product