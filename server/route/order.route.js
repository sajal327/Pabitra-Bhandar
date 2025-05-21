import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  CashOnDeliveryOrderController,
  getOrderDetailsController,
  getAllOrdersController,
  cancelOrderController,
  // paymentController,
  // webhookStripe,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/cash-on-delivery", auth, CashOnDeliveryOrderController);
// orderRouter.post("/checkout", auth, paymentController);
// orderRouter.post("/webhook", webhookStripe);
orderRouter.get("/order-list", auth, getOrderDetailsController);
orderRouter.get("/all-order-list", auth, getAllOrdersController);
orderRouter.put("/cancel/:id", auth, cancelOrderController);
orderRouter.put("/cancel/:orderId", auth, cancelOrderController);

export default orderRouter;
