// import mongoose from "mongoose";
// import Product from "../model/productModel.js";

// // Create Products
// export const createProducts = async (req, res)=>{
//     try {
//        const p =await Product.create(req.body) 
//        return res.status(200).json(p)
//     } catch (error) {
//         return res.status(400).json({error: error.message})
//     }
// }
// // get all products
// export const getAllProducts = async (req,res)=>{
//     try{
//     const products = await Product.find()
//     if(products.length === 0){
//         return res.status(404).json({message : "NO PRODUCT AVAILABLE"})
//     }
//     res.status(200).json(products)
//     }catch(error){
//         return res.status(400).json({error: error.message})
//     }
// }

// //update product details
// export const productsUpdate = async (req,res)=>{
//     try {
//         const id = req.params.id
//         const productExist =await Product.findOne({_id:id})
//           if(!productExist){
//         return res.status(404).json({message : "PRODUCT NOT AVAILABLE"})
//     }
//     const update= await Product.findByIdAndUpdate(
//         id,
//         req.body,
//         {new: true,runValidators:true}
//     )
//     res.status(200).json(update)
//     } catch (error) {
//         return res.status(400).json({error: error.message})
//     }
// }

// // get product by id
// export const getProductById = async (req,res)=>{
//     try {
//         const id = req.params.id
//        if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(400).json({ message: "Invalid product ID format" });
//        }
//        const product =await Product.findById(id)
//          if(!product){
//         return res.status(404).json({message : "PRODUCT NOT AVAILABLE"})}
//         res.status(200).json(product)
//     } catch (error) {
//         return res.status(400).json({error: error.message})
//     }
// }
// export const deleteProduct = async (req,res)=>{
//      try {
//         const id = req.params.id
//         if(!mongoose.Types.ObjectId.isValid(id)){
//             return res.status(400).json({ message: "Invalid product ID format" }); 
//         }
//         const dltedProduct = await Product.findByIdAndDelete(id)
//         if(!dltedProduct){
//           return res.status(404).json({message : "PRODUCT NOT AVAILABLE"})  
//         }
//         return res.json(200).json({message: "PRODUCT DELETED SUCCESSFULLY",dltedProduct})
//      } catch (error) {
//           return res.status(400).json({error: error.message})
//      }
// }

// // Filter by priceMin (GET /product?priceMin=1000)

// export const getProductsByMinPrice = async (req, res) => {
//   try {
//       const priceMin = req.query.priceMin
//       const filter={}
      
//       if(priceMin){
//         const min =Number(priceMin)
//         if(isNaN(min)){
//             res.status(400).json({message: "priceMin Must be number"})
//         }
//         if(min <= 0){
//             res.status(400).json({message: "priceMin Must be positive"})
//         }
//         filter.price ={$gte : min}
//       }
//       const products = await Product.find(filter)
//       res.status(200).json(products)
//   } catch (error) {
//         res.status(500).json({ error: error.message });   
//   }
// };

// // Get all products that belong to a specific category
// export const getProductByCategory =async (req,res)=>{
//     try {
//          const category = req.query.category
//          if(!category){
//             res.status(404).json({message: "Category required"})
//          }
//          const products = await Product.find({
//             category : category.toLowerCase()
//          })
//          res.status(200).json(products)
//     } catch (error) {
//         res.status(500).json({ error: error.message });  
//     }
// }

// // search the product using name
// export const searchProductByName = async (req,res)=>{
//     try {
//         const name =req.query.name
//         if(!name){
//            res.status(404).json({message: "Name required"}) 
//         }
//         const product = await Product.find({
//             name : {$regex : name.toLowerCase(), $options : "i"}
//         })
//         res.status(200).json(product)
//     } catch (error) {
//         res.status(500).json({ error: error.message });  
//     }
// }
// // get all the elememt from name andprice field
// export const getNameAndPrice =async (req,res)=>{
//     try {
//         const products = await Product.find({},{name:1,price:1,category:1,_id:0})
//         res.status(200).json(products)
//     } catch (error) {
//         res.status(500).json({ error: error.message });  
//     }
// }
// export const getSortedPagination = async (req,res)=>{
//     try {
//         const page =Number(req.query.page) || 1
//         const limit = Number(req.query.limit) ||3
//         const sortBy =req.query.sortBy || "price"
//         const order = req.query.order === "desc" ? -1 : 1

//         const skip =(page -1) * limit

//         const product = await Product.find()
//         .sort({ [sortBy] : order })
//         .skip(skip)
//         .limit(limit)

//         res.status(200).json(product)
//     } catch (error) {
//         res.status(500).json({ error: error.message }); 
//     }
// }


