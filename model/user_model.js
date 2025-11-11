import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    createAt:{
        type: Date,
        default: Date.now
    }
})
const Users = mongoose.model("Users",userSchema)
export default Users