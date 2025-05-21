import { Router } from "express";
import {
  getGalleryImages,
  addGalleryImage,
} from "../controllers/gallery.controller.js";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js"; // optional if admin-only
const router = Router();

router.get("/gallery", getGalleryImages);
router.post("/gallery", auth, isAdmin, addGalleryImage); // Admin uploads only

export default router;
