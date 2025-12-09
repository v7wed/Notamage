import express from "express";
import {
  createNote,
  getNote,
  getAllNotes,
  updateNote,
  deleteNote,
} from "../Controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);

router.get("/:id", getNote);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
