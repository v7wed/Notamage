import express from "express";
import notesRoutes from "./Routes/notesRoutes.js";
import { connectDB } from "./Config/db.js";
import dotenv from "dotenv";
import theLimiter from "./Middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(theLimiter);

app.use("/api/notes/", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server Started on port", PORT);
  });
});
