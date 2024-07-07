import express, { Request, Response } from "express";
import paymentRoutes from "./routes/paymentRoutes";

const app = express();

app.use(express.json());
app.use("/api", paymentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world EaglePay!");
});

export default app;
