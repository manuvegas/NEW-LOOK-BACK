const cloudinary = require('../config/connection.cloudinary');

const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath,{
      folder:"NewLook"
    });
    return result;
  } catch (error) {
    throw new Error('Error uploading image to Cloudinary');
  }
};

const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error('Error deleting image from Cloudinary');
  }
};

module.exports = {
  uploadImage,
  deleteImage,
};