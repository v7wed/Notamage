import Note from "../Models/Note.js";

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    console.error("error in getAllNotes controller: ", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getUserNotes(req, res) {
  try {
    const userNotes = await Note.find({ userID: req.params.id }).sort({
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
    const newNote = new Note({ title, content, userID, categoryID });
    await newNote.save();
    return res.status(201).json({ message: "Note creatd successfully" });
  } catch (error) {
    console.error("error in createNote controller: ", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export async function updateNote(req, res) {
  try {
    const { title, content, userID, categoryID } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, userID, categoryID },
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
