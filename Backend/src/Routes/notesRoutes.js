import express from "express";

import {
  createNote,
  getNote,
  getAllNotes,
  updateNote,
  deleteNote,
  getUserNotes,
} from "../Controllers/notesControllers.js";
import { NoteLimit } from "../Middleware/RateLimiters.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/user/:id", getUserNotes);
router.get("/:id", getNote);
router.post("/", NoteLimit, createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
