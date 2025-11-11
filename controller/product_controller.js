import mongoose from "mongoose";
import Product from "../model/productModel.js";

// Create Products
export const createProducts = async (req, res)=>{
    try {
       const p =await Product.create(req.body) 
       return res.status(200).json(p)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}
// get all products
export const getAllProducts = async (req,res)=>{
    try{
    const products = await Product.find()
    if(products.length === 0){
        return res.status(404).json({message : "NO PRODUCT AVAILABLE"})
    }
    res.status(200).json(products)
    }catch(error){
        return res.status(400).json({error: error.message})
    }
}

//update product details
export const productsUpdate = async (req,res)=>{
    try {
        const id = req.params.id
        const productExist =await Product.findOne({_id:id})
          if(!productExist){
        return res.status(404).json({message : "PRODUCT NOT AVAILABLE"})
    }
    const update= await Product.findByIdAndUpdate(
        id,
        req.body,
        {new: true}
    )
    res.status(200).json(update)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

// get product by id
export const getProductById = async (req,res)=>{
    try {
        const id = req.params.id
       if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ message: "Invalid product ID format" });
       }
       const product =await Product.findById(id)
         if(!product){
        return res.status(404).json({message : "PRODUCT NOT AVAILABLE"})}
        res.status(200).json(product)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}
export const deleteProduct = async (req,res)=>{
     try {
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: "Invalid product ID format" }); 
        }
        const dltedProduct = await Product.findByIdAndDelete(id)
        if(!dltedProduct){
          return res.status(404).json({message : "PRODUCT NOT AVAILABLE"})  
        }
        return res.json(200).json({message: "PRODUCT DELETED SUCCESSFULLY",dltedProduct})
     } catch (error) {
          return res.status(400).json({error: error.message})
     }
}