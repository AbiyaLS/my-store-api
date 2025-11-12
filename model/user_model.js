import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        trim: true
    },
    createAt:{
        type: Date,
        default: Date.now
    }
})
const Users = mongoose.model("Users",userSchema)
export default Users