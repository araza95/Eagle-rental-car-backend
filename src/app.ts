import express from "express";
import paymentRoutes from "./routes/paymentRoutes";

const app = express();

app.use(express.json());
app.use("/api", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

export default app;
