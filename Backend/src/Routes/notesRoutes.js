import express from "express";

import {
  createNote,
  getNote,
  updateNote,
  deleteNote,
  getUserNotes,
} from "../Controllers/notesControllers.js";
import { NoteLimit } from "../Middleware/RateLimiters.js";

const router = express.Router();

router.get("/user/:id", getUserNotes);
router.get("/:id", getNote);
router.post("/", NoteLimit, createNote);
router.put("/:id", NoteLimit, updateNote);
router.delete("/:id", deleteNote);

export default router;
