import uploadImageClodinary from "../utils/uploadImageClodinary.js";
import GalleryModel from "../models/gallery.model.js";

const uploadImageController = async (request, response) => {
  try {
    const file = request.file;

    const uploadImage = await uploadImageClodinary(file);

    const newImage = new GalleryModel({
      url: uploadImage.secure_url,
      public_id: uploadImage.public_id,
    });
    await newImage.save();

    return response.json({
      message: "Upload done",
      data: uploadImage,
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default uploadImageController;
