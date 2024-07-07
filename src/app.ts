import express, { Request, Response } from "express";
import paymentRoutes from "./routes/paymentRoutes";
import cors from "cors";

const app = express();
// Enable CORS for all origins
app.use(cors());

app.use(express.json());

app.use("/api", paymentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world EaglePay!");
});

export default app;
