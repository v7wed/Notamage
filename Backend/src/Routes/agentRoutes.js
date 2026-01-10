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
  confirmAgentAction,
  getUserContextForAgent,
  createCategoryByAgent,
  updateCategoryByAgent,
  deleteCategoryByAgent,
  assignNotesToCategoryByAgent,
} from "../Controllers/agentControllers.js";
import protect from "../Middleware/auth.js";
import { agentProtect } from "../Middleware/agent.js";

const router = express.Router();

// ============================================
// CHAT ROUTES (Frontend → Express → FastAPI)
// Protected by user JWT
// ============================================

/**
 * Main chat endpoint - user sends message, gets Mage response
 * POST /api/agent/chat
 */
router.post("/chat", protect, chatWithAgent);

/**
 * Confirmation endpoint - user confirms/rejects pending action
 * POST /api/agent/chat/confirm
 */
router.post("/chat/confirm", protect, confirmAgentAction);

// ============================================
// AGENT TOOL ROUTES (FastAPI → Express)
// Protected by service-to-service auth
// ============================================

/**
 * Get all notes for a user
 * GET /api/agent/notes/:userId
 */
router.get("/notes/:userId", agentProtect, getNotesForAgent);

/**
 * Search notes by query
 * GET /api/agent/notes/:userId/search?q=keyword
 */
router.get("/notes/:userId/search", agentProtect, searchNotesForAgent);



/**
 * Get all categories for a user
 * GET /api/agent/categories/:userId
 */
router.get("/categories/:userId", agentProtect, getCategoriesForAgent);

/**
 * Get user context summary
 * GET /api/agent/context/:userId
 */
router.get("/context/:userId", agentProtect, getUserContextForAgent);

/**
 * Create a single note
 * POST /api/agent/notes/create
 */
router.post("/notes/create", agentProtect, createNoteByAgent);

/**
 * Create multiple notes at once
 * POST /api/agent/notes/batch-create
 */
router.post("/notes/batch-create", agentProtect, batchCreateNotesByAgent);

/**
 * Update a note (requires confirmation flag)
 * PUT /api/agent/notes/:noteId
 */
router.put("/notes/:noteId", agentProtect, updateNoteByAgent);

/**
 * Delete a note (requires confirmation flag)
 * DELETE /api/agent/notes/:noteId
 */
router.delete("/notes/:noteId", agentProtect, deleteNoteByAgent);

// ============================================
// CATEGORY ROUTES (Not destructive)
// ============================================

/**
 * Create a category
 * POST /api/agent/categories/create
 */
router.post("/categories/create", agentProtect, createCategoryByAgent);

/**
 * Update a category
 * PUT /api/agent/categories/:categoryId
 */
router.put("/categories/:categoryId", agentProtect, updateCategoryByAgent);

/**
 * Delete a category (notes get uncategorized, not deleted)
 * DELETE /api/agent/categories/:categoryId
 */
router.delete("/categories/:categoryId", agentProtect, deleteCategoryByAgent);

/**
 * Assign notes to a category
 * PUT /api/agent/categories/:categoryId/assign
 */
router.put("/categories/:categoryId/assign", agentProtect, assignNotesToCategoryByAgent);

export default router;
