const Product = require("../models/productSchema");
const mongoose = require("mongoose");

// get all Products
const getProducts = async (req, res) => {
  const product = await Product.find({}).sort({ createdAt: -1 });

  res.status(200).json(product);
};
// get a single Product
const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such Product" });
  }
  const product = await Product.findById(id);
  Product.find();

  if (!product) {
    return res.status(404).json({ error: "no such Product" });
  }
  res.status(200).json(product);
};
// create new Product
const createProduct = async (req, res) => {
  const { title, price, description, image } = req.body;

  // add doc to db
  try {
    const product = await Product.create({ title, price, description, image });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// delete a Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such Product" });
  }

  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    return res.status(400).json({ error: "no such Product" });
  }

  res.status(200).json(product);
};
// update a Product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such Product" });
  }

  const product = await Product.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!product) {
    return res.status(400).json({ error: "no such Product" });
  }
  res.status(200).json(product);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
