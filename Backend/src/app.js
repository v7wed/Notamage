import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./Routes/notesRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import categRoutes from "./Routes/categRoutes.js";
import agentRoutes from "./Routes/agentRoutes.js";
import { GeneralGetLimit } from "./Middleware/RateLimiters.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

// Trust Render's proxy to get actual client IPs
// Required for rate limiting by IP when behind load balancer
app.set('trust proxy', true);

// CORS configuration - environment-specific
const allowedOrigins =
  process.env.NODE_ENV == "production"
    ? [
        process.env.AGENT_SERVICE_URL, // Production FastAPI agent 
      ]
    : [
        "http://localhost:5173", // Local frontend dev
        "http://localhost:8000", // Local FastAPI agent dev
      ];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

app.use(express.json());

app.get('/health', (_,res)=>{ //health check
  res.status(200).json({message:"Notamage server is running OK"})
})
app.use("/api/users", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/categ", categRoutes);
app.use("/api/agent", agentRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get("*", GeneralGetLimit, (_, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
  });
}

export default app;