import express from "express";

import { newUser, signIn, currUser, updateEmail, updatePassword, deleteAccount} from "../Controllers/authControllers.js";
import protect from "../Middleware/auth.js";
import { LoginLimit, SignupLimit } from "../Middleware/RateLimiters.js";

const router = express.Router();

router.post("/reg", SignupLimit, newUser);
router.post("/signin", LoginLimit, signIn);
router.get("/me", protect, currUser);
router.put("/email", protect, updateEmail);
router.put("/password", protect, updatePassword);

router.delete("/:id" , deleteAccount ) //currently for testing purposes , only used on test DB

export default router;
