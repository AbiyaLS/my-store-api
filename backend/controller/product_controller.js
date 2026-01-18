import mongoose from "mongoose";
import Product from "../model/productModel.js";

export const createProducts = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      user: req.userId // 🔐 userId from JWT middleware
    });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const productsUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    // validate mongo id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // find product
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "PRODUCT NOT AVAILABLE" });
    }

    // ownership check
    if (product.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // update
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
 

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "PRODUCT NOT AVAILABLE" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "PRODUCT NOT AVAILABLE" });
    }

    // ownership check
    if (product.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await product.deleteOne();

    return res.status(200).json({
      message: "PRODUCT DELETED SUCCESSFULLY"
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search?.trim() || "";

    const query = {
      user: req.userId, // 🔐 only logged-in user's products
      ...(search && {
        name: { $regex: search, $options: "i" }
      })
    };

    const totalCount = await Product.countDocuments(query);
    const totalPage = Math.ceil(totalCount / limit);

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      page,
      limit,
      totalCount,
      totalPage,
      products
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch products" });
  }
};
