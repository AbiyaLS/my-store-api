import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Users from "../../model/user_model.js"

export const register = async (req,res) =>{
    try {
        const { name, email, password } = req.body

        if(!name || !email || !password){
            return res.status(400).json({message: "All field required"})
        }

        if(password.length < 4){
            return res.status(400).json({message : "Password must contain atleast 4 character long"})
        }
        
        const emailExist = await Users.findOne({ email })
        if(emailExist){
            return res.status(401).json({message : "Email Already Register"})
        }
        // hash
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = await Users.create({
            name,
            email,
            password : hashedPassword
        })

        return res.status(200).json({
            message: "Registration Successfully",
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            }})

    } catch (error) {
        res.status(500).json({message: "Server Error", error})
    }
}

export const login = async (req,res) => {
    try {
        const { email, password } = req.body
        
        if(!email || !password){
            return res.status(404).json({message: "All Field required"})
        }
        
        const user = await Users.findOne({ email })
        if(!user){
            return res.status(404).json({message : "Invalid email and password"})
        }
        // Compare usrer password with hashed password
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(404).json({message: "Invalid email and password"})
        }
        // Create Token
        const token = jwt.sign(
            { userId : user._id },
            process.env.JWt_SECERT,
            { expiresIn: "1h"}
        )

        res.cookie("myToken",token,{
             httpOnly: true,
             sameSite: "none",
        })

        return res.status(200).json({message: "Login Successfully",token: token})

    } catch (error) {
        res.status(500).json({message: "Server Error", error})
    }
}