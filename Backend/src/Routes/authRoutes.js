import express from "express";

import { newUser, signIn, currUser, updateEmail, updatePassword } from "../Controllers/authControllers.js";
import protect from "../Middleware/auth.js";

const router = express.Router();

router.post("/reg", newUser);
router.post("/signin", signIn);
router.get("/me", protect, currUser);
router.put("/email", protect, updateEmail);
router.put("/password", protect, updatePassword);

export default router;
