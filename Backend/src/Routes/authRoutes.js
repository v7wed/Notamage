import express from "express";
import { newUser, signIn, currUser } from "../Controllers/authControllers.js";
import protect from "../Middleware/auth.js";

const router = express.Router();

router.post("/reg", newUser);
router.post("/signin", signIn);
router.get("/me", protect, currUser);

export default router;
