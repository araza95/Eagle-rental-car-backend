// Controller
import { Request, Response } from "express";
import { processPayment } from "../services/payment.service";

export const handlePayment = async (req: Request, res: Response) => {
  const { clientEmail, adminEmail, subject, message } = req.body;

  try {
    const paymentInfo = { clientEmail, adminEmail, subject, message };
    const result = await processPayment({ paymentInfo });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
