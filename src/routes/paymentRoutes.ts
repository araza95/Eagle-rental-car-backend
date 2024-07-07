// Routes
import { Router } from "express";
import { handlePayment } from "../controllers/payment.controller";

const router = Router();

router.post("/payment", handlePayment);

export default router;
