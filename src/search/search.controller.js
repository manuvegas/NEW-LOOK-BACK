const { searchProductsByTitle } = require('./search.service');

const searchProductsByTitleController = async (req, res) => {
  const searchTerm = req.query.q; 
  try {
    const products = await searchProductsByTitle(searchTerm);
    res.json(products);
  } catch (error) {
    console.error('Error al buscar productos por título:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  searchProductsByTitleController,
};