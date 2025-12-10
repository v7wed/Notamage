import express from "express";
import notesRoutes from "./Routes/notesRoutes.js";
import { connectDB } from "./Config/db.js";
import dotenv from "dotenv";
import theLimiter from "./Middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
app.use(theLimiter);

app.use("/api/notes/", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server Started on port", PORT);
  });
});
