const imageRepository = require('./imgs.repository');
const fs = require('fs');

const uploadImageService = async (filePath) => {
  try {
    const result = await imageRepository.uploadImage(filePath);
    fs.unlinkSync(filePath); 
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteImageService = async (publicId) => {
  try {
    await imageRepository.deleteImage(publicId);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  uploadImageService,
  deleteImageService,
};