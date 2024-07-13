const { searchProductsByTitleRepository } = require("./search.repository");

const searchProductsByTitle = async (searchTerm) => {
  try {
    const products = await searchProductsByTitleRepository(searchTerm);
    return products;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchProductsByTitle,
};