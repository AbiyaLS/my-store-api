import jwt from "jsonwebtoken"

export function authMiddleware(req,res, next){
    console.log("Middleware reached")
    console.log("req.cookies",req.cookies)

    const token = req.cookies.myToken

    if(!token){
        return res.status(401).json({ message: "Unauthorized"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWt_SECERT)
        req.myUserId = decoded.userId
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized.Please Login" });
    }
}