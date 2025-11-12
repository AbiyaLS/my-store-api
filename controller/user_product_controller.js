import express from "express"
import Product from "../model/productModel.js"
import mongoose from "mongoose"

// create the product for user
export const createProductForUser = async (req,res)=>{
   try {
    const {name,price,category,description,instock,user} = req.body
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
export const getProductsByUser = async (req, res) => {
  try {
    // read the id from the route param named ":id"
    const userId = req.params.id;

    // validate format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    // find products where user matches
    const products = await Product.find({ user: userId }).populate("user", "name email -_id");

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this user" });
    }

    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};