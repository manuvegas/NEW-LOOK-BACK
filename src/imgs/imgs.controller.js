const { uploadImageService, deleteImageService } = require('./imgs.service');

const postImageController = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    const { img } = req.files;
    const result = await uploadImageService(img.tempFilePath);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteImageController = async (req, res) => {
  try {
    const { publicId } = req.params;
    await deleteImageService(publicId);
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postImageController,
  deleteImageController,
};