import express from "express";

import {
  createNote,
  getNote,
  updateNote,
  deleteNote,
  getUserNotes,
} from "../Controllers/notesControllers.js";
import { NoteLimit, ApiLimit } from "../Middleware/RateLimiters.js";

const router = express.Router();

router.get("/for/:userid", ApiLimit, getUserNotes);
router.get("/:id", ApiLimit, getNote);
router.post("/", NoteLimit, createNote);
router.put("/:id", NoteLimit, updateNote);
router.delete("/:id", ApiLimit, deleteNote);

export default router;
