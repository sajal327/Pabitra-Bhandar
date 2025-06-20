import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
dotenv.config();

import userRouter from "./route/user.route.js";
import categoryRouter from "./route/category.route.js";
import uploadRouter from "./route/upload.router.js";
import subCategoryRouter from "./route/subCategory.route.js";
import productRouter from "./route/product.route.js";
import cartRouter from "./route/cart.route.js";
import addressRouter from "./route/address.route.js";
import orderRouter from "./route/order.route.js";

const app = express();
app.set('trust proxy', 1);
// Connect to MongoDB
connectDB();

// const corsOptions = {
//   origin: [
//     process.env.FRONTEND_URL,
//     "http://localhost:5173",
//     "https://pabitra-bhandar-client.onrender.com",
//   ],
//   credentials: true,
// };
// CORS options
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Replace with your frontend URL
  credentials: true, // This allows cookies to be sent across domains
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
  preflightContinue: false,
};
app.use(cors(corsOptions));




// const corsOptions = {
//   origin: [
//     process.env.FRONTEND_URL,
//     "http://localhost:5173",
//     "https://pabitra-bhandar-client.onrender.com", // your Render frontend URL
//   ],
//   credentials: true,
// };

// app.use(cors(corsOptions));

// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.FRONTEND_URL,
//   })
// );

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev")); // Add logging format
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadRouter);
app.use("/api/subcategory", subCategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB. Server not started.");
  });
