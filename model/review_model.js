import mongoose  from "mongoose";

const reviewSchema = new mongoose.Schema({

    comments:{
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
    
})

const Review = mongoose.model("Review",reviewSchema) 
export default Review