import Note from "../Models/Note.js";
import Category from "../Models/Category.js";

/**
 * Agent Bridge Controllers
 * These endpoints are designed for the LangGraph agent to interact with the Express server.
 * They provide structured responses optimized for LLM consumption.
 */

// ============================================
// READ OPERATIONS (No confirmation needed)
// ============================================

/**
 * Get all notes for a user - formatted for agent context
 * GET /api/agent/notes/:userId
 */
export async function getNotesForAgent(req, res) {
  try {
    const { userId } = req.params;
    const { limit = 50 } = req.query;

    const notes = await Note.find({ userID: userId })
      .sort({ updatedAt: -1 })
      .limit(parseInt(limit))
      .populate("categoryID", "name");

    const formattedNotes = notes.map((note) => ({
      id: note._id.toString(),
      title: note.title || "(Untitled)",
      content: note.content || "(No Content)",
      category: note.categoryID?.name || null,
      categoryId: note.categoryID?._id?.toString() || null,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      count: formattedNotes.length,
      notes: formattedNotes,
    });
  } catch (error) {
    console.error("Error in getNotesForAgent:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch notes for agent",
    });
  }
}

/**
 * Search notes by query - for agent to find relevant notes
 * GET /api/agent/notes/:userId/search?q=keyword
 */
export async function searchNotesForAgent(req, res) {
  try {
    const { userId } = req.params;
    const { q: searchQuery, limit = 20 } = req.query;

    if (!searchQuery?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Search query is required",
      });
    }

    const notes = await Note.find({
      userID: userId,
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ],
    })
      .sort({ updatedAt: -1 })
      .limit(parseInt(limit))
      .populate("categoryID", "name");

    const formattedNotes = notes.map((note) => ({
      id: note._id.toString(),
      title: note.title || "(Untitled)",
      content: note.content || "(No Content)",
      contentPreview:
        note.content?.length > 200
          ? note.content.substring(0, 200) + "..."
          : note.content,
      category: note.categoryID?.name || null,
      categoryId: note.categoryID?._id?.toString() || null,
      updatedAt: note.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      query: searchQuery,
      count: formattedNotes.length,
      notes: formattedNotes,
    });
  } catch (error) {
    console.error("Error in searchNotesForAgent:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to search notes",
    });
  }
}


/**
 * Get all categories for a user - for agent context
 * GET /api/agent/categories/:userId
 */
export async function getCategoriesForAgent(req, res) {
  try {
    const { userId } = req.params;

    const categories = await Category.find({ userID: userId });

    // Get note counts for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (cat) => {
        const noteCount = await Note.countDocuments({ categoryID: cat._id });
        return {
          id: cat._id.toString(),
          name: cat.name,
          noteCount,
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: categoriesWithCounts.length,
      categories: categoriesWithCounts,
    });
  } catch (error) {
    console.error("Error in getCategoriesForAgent:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch categories",
    });
  }
}

// ============================================
// WRITE OPERATIONS (Create - No confirmation)
// ============================================

/**
 * Create a single note via agent
 * POST /api/agent/notes/create
 */
export async function createNoteByAgent(req, res) {
  try {
    const { userId, title, content, categoryId } = req.body;
    console.log(`request received from agent with the following data, 
      userID: ${userId}, 
      title: ${title},
      content: ${content},
      categoryId: ${categoryId},`)

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "userId is required",
      });
    }

    const noteData = {
      title: title ,
      content: content ,
      userID: userId,
      categoryID: categoryId,
    };

    const newNote = await Note.create(noteData);

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      note: {
        id: newNote._id.toString(),
        title: newNote.title,
        content: newNote.content,
        categoryId: newNote.categoryID?.toString() || null,
        createdAt: newNote.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in createNoteByAgent:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to create note",
    });
  }
}

/**
 * Create multiple notes at once via agent
 * POST /api/agent/notes/batch-create
 */
export async function batchCreateNotesByAgent(req, res) {
  try {
    const { userId, notes } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "userId is required",
      });
    }

    if (!notes || !Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        error: "notes array is required and must not be empty",
      });
    }

    if (notes.length > 10) {
      return res.status(400).json({
        success: false,
        error: "Maximum 10 notes can be created at once",
      });
    }

    const notesToCreate = notes.map((note) => ({
      title: note.title,
      content: note.content ,
      userID: userId,
      categoryID: note.categoryId,
    }));

    const createdNotes = await Note.insertMany(notesToCreate);

    const formattedNotes = createdNotes.map((note) => ({
      id: note._id.toString(),
      title: note.title,
      content: note.content,
      categoryId: note.categoryID?.toString() || null,
    }));

    return res.status(201).json({
      success: true,
      message: `${createdNotes.length} notes created successfully`,
      notes: formattedNotes,
    });
  } catch (error) {
    console.error("Error in batchCreateNotesByAgent:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to create notes",
    });
  }
}

// ============================================
// DESTRUCTIVE OPERATIONS (Require confirmation)
// ============================================

/**
 * Update a note via agent (after confirmation)
 * PUT /api/agent/notes/:noteId
 */
export async function updateNoteByAgent(req, res) {
  try {
    const { noteId } = req.params;
    const { title, content, categoryId } = req.body;


    const existingNote = await Note.findById(noteId);
    if (!existingNote) {
      return res.status(404).json({
        success: false,
        error: "Note not found",
      });
    }

    // Build update object - only update provided fields
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (categoryId !== undefined) updateData.categoryID = categoryId;  

    const updatedNote = await Note.findByIdAndUpdate(noteId, updateData, {
      new: true,
    }).populate("categoryID", "name");

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note: {
        id: updatedNote._id.toString(),
        title: updatedNote.title,
        content: updatedNote.content,
        category: updatedNote.categoryID?.name || null,
        categoryId: updatedNote.categoryID?._id?.toString() || null,
        updatedAt: updatedNote.updatedAt,
      },
      previousVersion: {
        title: existingNote.title,
        content: existingNote.content,
      },
    });
  } catch (error) {
    console.error("Error in updateNoteByAgent:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to update note",
    });
  }
}

/**
 * Delete a note via agent (after confirmation)
 * DELETE /api/agent/notes/:noteId
 */
export async function deleteNoteByAgent(req, res) {
  try {
    const { noteId } = req.params;

    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        error: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      deletedNote: {
        id: deletedNote._id.toString(),
        title: deletedNote.title,
        content: deletedNote.content,
      },
    });
  } catch (error) {
    console.error("Error in deleteNoteByAgent:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to delete note",
    });
  }
}

// ============================================
// CHAT BRIDGE (Main communication endpoint)
// ============================================

/**
 * Main chat endpoint - bridges frontend to FastAPI agent
 * POST /api/agent/chat
 */
export async function chatWithAgent(req, res) {
  try {
    const {conversationHistory = [] } = req.body;
    const user = req.user; // From auth middleware


    // Get the FastAPI agent service URL from environment
    const agentServiceUrl = process.env.AGENT_SERVICE_URL;
    const agentServiceSecret = process.env.AGENT_SERVICE_SECRET;

    if (!agentServiceUrl) {
      console.error("AGENT_SERVICE_URL not configured");
      return res.status(503).json({
        success: false,
        error: "Agent service not configured",
      });
    }

    // Forward request to FastAPI agent
    const agentPayload = {
      user_id: user._id.toString(),
      user_name: user.Name,
      conversation_history: conversationHistory,
    };

    const agentResponse = await fetch(`${agentServiceUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${agentServiceSecret}`,
      },
      body: JSON.stringify(agentPayload),
    });

    if (!agentResponse.ok) {
      const errorData = await agentResponse.json().catch(() => ({}));
      console.error("Agent service error:", errorData);
      return res.status(agentResponse.status).json({
        success: false,
        error: errorData.error || "Agent service error",
      });
    }

    const agentData = await agentResponse.json();

    return res.status(200).json({
      success: true,
      response: agentData.response,
      actionsTaken: agentData.actions_taken || [],
      requiresConfirmation: agentData.requires_confirmation || false,
      pendingAction: agentData.pending_action || null,
    });
  } catch (error) {
    console.error("Error in chatWithAgent:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to communicate with agent",
    });
  }
}


/**
 * Get user context summary for agent
 * GET /api/agent/context/:userId
 */
export async function getUserContextForAgent(req, res) {
  try {
    const { userId } = req.params;

    // Get note count
    const noteCount = await Note.countDocuments({ userID: userId });

    // Get category count
    const categoryCount = await Category.countDocuments({ userID: userId });

    // Get recent notes (last 5)
    const recentNotes = await Note.find({ userID: userId })
      .sort({ updatedAt: -1 })
      .limit(5)
      .select("title updatedAt");

    // Get categories with note counts
    const categories = await Category.find({ userID: userId });
    const categorySummary = await Promise.all(
      categories.map(async (cat) => ({
        name: cat.name,
        noteCount: await Note.countDocuments({ categoryID: cat._id }),
      }))
    );

    return res.status(200).json({
      success: true,
      context: {
        totalNotes: noteCount,
        totalCategories: categoryCount,
        recentNotes: recentNotes.map((n) => ({
          title: n.title || "(Untitled)",
          updatedAt: n.updatedAt,
        })),
        categories: categorySummary,
      },
    });
  } catch (error) {
    console.error("Error in getUserContextForAgent:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch user context",
    });
  }
}

// ============================================
// CATEGORY OPERATIONS (Not destructive)
// ============================================

/**
 * Create a category via agent
 * POST /api/agent/categories/create
 */
export async function createCategoryByAgent(req, res) {
  try {
    const { userId, name } = req.body;

    if (!userId || !name?.trim()) {
      return res.status(400).json({
        success: false,
        error: "userId and name are required",
      });
    }

    const newCategory = await Category.create({
      name: name.trim(),
      userID: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: {
        id: newCategory._id.toString(),
        name: newCategory.name,
      },
    });
  } catch (error) {
    console.error("Error in createCategoryByAgent:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to create category",
    });
  }
}

/**
 * Update a category via agent (NOT destructive - no confirmation needed)
 * PUT /api/agent/categories/:categoryId
 */
export async function updateCategoryByAgent(req, res) {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        error: "name is required",
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name: name.trim() },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: {
        id: updatedCategory._id.toString(),
        name: updatedCategory.name,
      },
    });
  } catch (error) {
    console.error("Error in updateCategoryByAgent:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to update category",
    });
  }
}

/**
 * Delete a category via agent (NOT destructive - no confirmation needed)
 * Notes in this category will be uncategorized, not deleted
 * DELETE /api/agent/categories/:categoryId
 */
export async function deleteCategoryByAgent(req, res) {
  try {
    const { categoryId } = req.params;

    // First, uncategorize all notes in this category
    await Note.updateMany(
      { categoryID: categoryId },
      { $set: { categoryID: null } }
    );

    // Then delete the category
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully. Notes have been uncategorized.",
      deletedCategory: {
        id: deletedCategory._id.toString(),
        name: deletedCategory.name,
      },
    });
  } catch (error) {
    console.error("Error in deleteCategoryByAgent:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to delete category",
    });
  }
}

/**
 * Assign notes to a category via agent
 * PUT /api/agent/categories/:categoryId/assign
 */
export async function assignNotesToCategoryByAgent(req, res) {
  try {
    const { categoryId } = req.params;
    const { noteIds } = req.body;

    if (!noteIds || !Array.isArray(noteIds) || noteIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: "noteIds array is required",
      });
    }

    // Verify category exists (null categoryId means uncategorize)
    if (categoryId !== "null") {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({
          success: false,
          error: "Category not found",
        });
      }
    }

    const result = await Note.updateMany(
      { _id: { $in: noteIds } },
      { $set: { categoryID: categoryId === "null" ? null : categoryId } }
    );

    return res.status(200).json({
      success: true,
      message: `${result.modifiedCount} notes assigned to category`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error in assignNotesToCategoryByAgent:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to assign notes to category",
    });
  }
}
