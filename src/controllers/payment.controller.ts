// Controller
import { Request, Response } from "express";
import { processPayment } from "../services/payment.service";

export const handlePayment = async (req: Request, res: Response) => {
  const { clientEmail, subject } = req.body;

  try {
    const paymentInfo = { clientEmail, subject };
    const result = await processPayment({ paymentInfo });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
