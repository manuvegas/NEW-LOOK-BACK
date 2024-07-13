const express = require("express")
const routerSearch = express.Router();
const { searchProductsByTitleController } = require('./search.controller');

routerSearch.get('/', searchProductsByTitleController);

module.exports = routerSearch;