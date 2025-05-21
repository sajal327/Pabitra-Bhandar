// models/gallery.model.js
import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String }, // from Cloudinary (optional for future delete feature)
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gallery", gallerySchema);
