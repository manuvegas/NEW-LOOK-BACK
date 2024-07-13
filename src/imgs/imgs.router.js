const express = require('express');
const ImagesRouter = express.Router();
const { postImageController, deleteImageController } = require('./imgs.controller');

ImagesRouter.post('/upload', postImageController);
ImagesRouter.delete('/:publicId', deleteImageController);

module.exports = ImagesRouter;