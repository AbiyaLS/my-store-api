import Users from "../model/user_model.js"

// Create User
export const createUser = async (req,res)=>{
    try {
        const create = await Users.create(req.body)
        res.status(200).json(create)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}
// get all users
export const getAllUsers = async (req,res)=>{
    try {
        const users = await Users.find()
        if(users.length === 0){
            return res.status(404).json({message : "NO USERS AVAILABLE"})
        }
        res.status(200).json(users)
    } catch (error) {
         return res.status(400).json({error: error.message})
    }
}