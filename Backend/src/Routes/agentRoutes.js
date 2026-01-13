import express from "express";

import {
  getNotesForAgent,
  searchNotesForAgent,
  getCategoriesForAgent,
  createNoteByAgent,
  batchCreateNotesByAgent,
  updateNoteByAgent,
  deleteNoteByAgent,
  chatWithAgent,
  getUserContextForAgent,
  createCategoryByAgent,
  updateCategoryByAgent,
  deleteCategoryByAgent,
  assignNotesToCategoryByAgent,
} from "../Controllers/agentControllers.js";
import protect from "../Middleware/auth.js";
import { agentProtect } from "../Middleware/agent.js";

const router = express.Router();

//main chat route that receives message from the frontend and sends to fastAPI
router.post("/chat", protect, chatWithAgent);


//Agent tool routes that receives requests from fastAPI 

//Get context
router.get("/context/:userId", agentProtect, getUserContextForAgent);
//Notes
router.get("/notes/:userId", agentProtect, getNotesForAgent);
router.get("/notes/:userId/search", agentProtect, searchNotesForAgent);
router.post("/notes/create", agentProtect, createNoteByAgent);
router.post("/notes/batch-create", agentProtect, batchCreateNotesByAgent);
router.put("/notes/:noteId", agentProtect, updateNoteByAgent);
router.delete("/notes/:noteId", agentProtect, deleteNoteByAgent);
//Categories
router.get("/categories/:userId", agentProtect, getCategoriesForAgent);
router.post("/categories/create", agentProtect, createCategoryByAgent);
router.put("/categories/:categoryId", agentProtect, updateCategoryByAgent);
router.delete("/categories/:categoryId", agentProtect, deleteCategoryByAgent);
router.put("/categories/:categoryId/assign", agentProtect, assignNotesToCategoryByAgent);

export default router;
