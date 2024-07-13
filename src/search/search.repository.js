const Product = require("../models/Products.model");

const searchProductsByTitleRepository = async (searchTerm) => {
  try {
    const regex = new RegExp(searchTerm, 'i');
    const products = await Product.find({ titulo: regex });
    return products;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchProductsByTitleRepository,
};