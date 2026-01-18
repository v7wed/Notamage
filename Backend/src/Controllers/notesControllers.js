import Note from "../Models/Note.js";

export async function getUserNotes(req, res) {
  try {
    const { search } = req.query
    let query = { userID: req.params.userid }
    if (search?.trim()) {
      // Security Layer: Escape special regex characters to prevent ReDoS attacks
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query = { 
        userID: req.params.userid, 
        $or: [
          { title: { $regex: escapedSearch, $options: 'i' } }, 
          { content: { $regex: escapedSearch, $options: 'i' } }
        ] 
      }
    }
    const userNotes = await Note.find(query).sort({
      createdAt: -1,
    });
    return res.status(200).json(userNotes);
  } catch (error) {
    console.error("error in getUserNotes controller: ", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getNote(req, res) {
  try {
    // Security layer: Validate ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid note ID format" });
    }
    
    const theNote = await Note.findById(req.params.id);
    if (!theNote)
      return res
        .status(404)
        .json({ message: "No Note with this id has been found" });
    res.status(200).json(theNote);
  } catch (error) {
    console.error("error in getNote controller: ", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export const createNote = async (req, res) => {
  try {
    const { title, content, userID, categoryID } = req.body;
    const newNote = await Note.create({ title, content, userID, categoryID });
    return res.status(201).json(newNote);
  } catch (error) {
    console.error("error in createNote controller: ", error);
    res.status(500).json({ message: "internal server error", error: error });
  }
};

export async function updateNote(req, res) {
  try {
    const { title, content, categoryID } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, categoryID },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    return res.status(200).json(updatedNote);
  } catch (error) {
    console.error("error in updateNote controller: ", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json(deletedNote);
  } catch (error) {
    console.error("error in deleteNote controller: ", error);
    res.status(500).json({ message: "internal server error" });
  }
}
