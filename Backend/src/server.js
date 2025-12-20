import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./Routes/notesRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import categRoutes from "./Routes/categRoutes.js";
import connectDB from "./Config/db.js";

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
//app.use(global_limit)

app.use("/api/users", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/categ", categRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server Started on port", PORT);
  });
});
