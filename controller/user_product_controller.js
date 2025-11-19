import express from "express"
import Product from "../model/productModel.js"
import mongoose from "mongoose"
import Users from "../model/user_model.js"

// create the product for user
export const createProductForUser = async (req,res)=>{
   try {
    const {name,price,category,description,instock,user} = req.body
    if(!user){
      return res.status(400).json({ message: "User ID is required" });
    }
    const product =await Product.create({name,price,category,description,instock,user})
    res.status(200).json(product)
   } catch (error) {
     res.status(500).json({ error: error.message }); 
   }
}

export const getUsersProduct = async (req,res)=>{
    try {
        const product = await Product.find()
        .populate("user","name email -_id")
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}

// get the specify product the user created
export const getSpecifyProductByUser = async (req,res)=>{
  try {
      const { userId } = req.params
      if(!mongoose.Types.ObjectId.isValid(userId)){
        res.status(404).json({message: "Invalid UserId"})
      }
      const filter ={ user: userId }
      const products = await Product.find(filter)
      if(products.length === 0){
        res.status(400).json({message: "No Product Available"})
      }
      res.status(200).json(products)
  } catch (error) {
        res.status(500).json({ error: error.message });
  }
}

export const getUserAndProducts =async (req,res)=>{
  try {
    const { userId } = req.params
    if(!mongoose.Types.ObjectId.isValid(userId)){
       res.status(404).json({message: "Invalid UserId"})
    }
    const user = await Users.findById(userId, "name email -_id")
    if(!user){
      res.status(404).json({message: "User not available"})
    }
    const products = await Product.find({user : userId})
    if(!products){
      res.status(404).json({message: "Products not available"})
    }
    res.status(200).json({user , products})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// update the product of a specific user
export const updateProductOfOwner =async (req,res)=>{
  try {
    const { uid,pid } = req.params
    if(!mongoose.Types.ObjectId.isValid(uid) || !mongoose.Types.ObjectId.isValid(pid)){
       res.status(404).json({message: "Invalid ids"})
    }
    const products = await Product.findById(pid)
     if(!products){
      res.status(404).json({message: "Products not available"})
    }
    if(products.user.toString() !== uid){
      res.status(404).json({message: "Unauthorized user"})
    }
    const update = await Product.findByIdAndUpdate(
      pid,
      req.body,
      {new :true,runValidators:true}
    )
    res.status(200).json(update)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// count how many prodct a user have
export const countProductOfUser =async (req,res)=>{
  try {
    const { userId } = req.params
    if(!mongoose.Types.ObjectId.isValid(userId)){
      res.status(404).json({message: "Invalid userId"})
    }
    const count = await Product.countDocuments({user: userId})
    res.status(200).json(count)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}