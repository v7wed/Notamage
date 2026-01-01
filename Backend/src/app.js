import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./Routes/notesRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import categRoutes from "./Routes/categRoutes.js";

dotenv.config();

const app = express();
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

app.get('/api/', (_,res)=>{
  res.status(200).json({message:"The server is running OK"})
})
app.use("/api/users", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/categ", categRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
  });
}

export default app;