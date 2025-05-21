// controllers/gallery.controller.js
import GalleryModel from "../models/gallery.model.js";

export const getGalleryImages = async (req, res) => {
  try {
    const images = await GalleryModel.find().sort({ createdAt: -1 }); // newest first
    res.json({
      success: true,
      error: false,
      data: images,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error fetching gallery images",
      success: false,
      error: true,
    });
  }
};

export const addGalleryImage = async (req, res) => {
  try {
    const { secure_url, public_id } = req.body;

    if (!secure_url) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Image URL is required",
      });
    }

    const newImage = new GalleryModel({ url: secure_url, public_id });
    const saved = await newImage.save();

    res.json({
      success: true,
      error: false,
      data: saved,
      message: "Image saved to gallery",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      message: err.message || "Failed to save image",
    });
  }
};
