import mongoose from "mongoose"
import Product from "../model/productModel.js"
import Review from "../model/review_model.js"
import Users from "../model/user_model.js"


// create Review
export const createReview = async (req,res)=>{
    try {
        const { comments,rating, user,product } =req.body 

        if(rating<0 || rating>5){
            res.status(404).json({message: "Rating must be in between 1 to 5"})
        }

        const userExist = await Users.findById(user)
        if(!userExist){
            res.status(400).json({message: "User not Found"})
        }

         const productExist = await Product.findById(product)
        if(!productExist){
            res.status(400).json({message: "Product not Found"})
        }

        const review = await Review.create({comments,rating,user,product})
        res.status(200).json(review)

    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}
// get all the review of products
export const getAllProductsReview = async (req,res)=>{
    try {
        const { productId } =req.params
        if(!mongoose.Types.ObjectId.isValid(productId)){
            res.status(404).json({message: "ProductId not found"})
        }
        const getReview = await Review.find({product : productId})
        .populate("user","name email -_id")
        .populate("product","name price description -_id")

        res.status(200).json(getReview)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}
// get all review of specific user
export const getAllReviewOfUser =async (req,res)=>{
     try {
        const {userId} = req.params
        if(!mongoose.Types.ObjectId.isValid(userId)){
           res.status(404).json({message: "UserId not found"}) 
        }
        const review = await Review.find({user: userId})
        .populate("product","name price -_id")
        res.status(200).json(review)
     } catch (error) {
        return res.status(400).json({error: error.message})
     }
}
// Prevent one user from reviewing the same product twice
export const createOrUpdateReview = async (req, res) => {
  try {
    const { comments, rating, user, product } = req.body; // use `comment` matching schema

    // simple validation
    if (!user || !product) {
      return res.status(400).json({ message: "user and product are required" });
    }
    if (rating < 0 || rating > 5) {
      return res.status(400).json({ message: "rating must be between 0 and 5" });
    }

    // check existing review
    const existing = await Review.findOne({ user, product });
    if (existing) {
      existing.comments = comment ?? existing.comments;
      existing.rating = rating ?? existing.rating;
      await existing.save();
      return res.status(200).json(existing); // <-- return prevents falling through
    }

    // create new review
    const created = await Review.create({ comments, rating, user, product });
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Get reviews for a specific product (using $match)

export const agg_reviewsByProduct = async (req,res)=>{
    try {
        const { productId } = req.params
        const data = await Review.aggregate([
            {
                $match: { product: new mongoose.Types.ObjectId(productId)}
            }
        ])
        res.status(200).json(data)
    } catch (error) {
       return res.status(500).json({ error: error.message }); 
    }
}
// get all 5 star review
export const getAll5StarReview = async (req,res)=>{
    try {
        const review = await Review.aggregate([
            {
                $match: { rating: 5}
            }
        ])
        res.status(200).json(review)
    } catch (error) {
       return res.status(500).json({ error: error.message }); 
    }
}
// Total number of reviews per product
export const totalReviewsPerProduct = async (req,res)=>{
    try {
       const data = await Review.aggregate([
        {
            $group :{
               _id: "$product",
               averageRating: {$avg : "$rating"},
               totalReviews : {$sum : 1},
               highestRating: {$max : "$rating"},
               lowestRating: {$min : "$rating"},
            }
        }
       ]) 
       res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ error: error.message }); 
    }
}