import Note from "../Models/Note.js";
import Category from "../Models/Category.js";



export async function getCateg(req, res) {
  try {
    const id = req.params.id;
    if (id) {
      const categ = await Category.findById(id);
      return res
        .status(200)
        .json(categ);
    } else {
      return res.status(200).json(null)
    }
  } catch (error) {
    console.error("error in createCateg controller: ", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function createCateg(req, res) {
  try {
    const { name, userID } = req.body;
    const result = await Category.create({ name, userID });
    return res
      .status(201)
      .json({ message: `category created successfully ${result}` });
  } catch (error) {
    console.error("error in createCateg controller: ", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function clearCateg(req, res) { //clear a category from all its notes (uncategorize them)
  try {
    const categoryID = req.params.id;
    await Note.updateMany({ categoryID }, { $set: { categoryID: null } });
    return res.status(200).json({
      message: `notes cleared from category successfully`,
    });
  } catch (error) {
    console.error("error in clearCateg controller: ", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function addtoCateg(req, res) {
  try {
    const { notesID, categoryID } = req.body;

    if (!notesID || !Array.isArray(notesID) || notesID.length === 0) {
      return res
        .status(400)
        .json({ message: "notesID must be a non-empty array" });
    }

    if (categoryID) {
      const category = await Category.findById(categoryID);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
    }


    const result = await Note.updateMany(
      { _id: { $in: notesID } },
      { $set: { categoryID: categoryID } }
    );

    return res.status(200).json({
      message: "Notes added to category successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("error in addtoCateg controller: ", error);
    return res.status(500).json({ message: "internal server error" });
  }
}

export async function updateCateg(req, res) {
  try {
    const { name } = req.body;
    const result = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!result) return res.status(404).json({ message: "Category not found" });
    return res.status(200).json(result);
  } catch (error) {
    console.error("error in updateCateg controller: ", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function deleteCateg(req, res) {
  try {
    const categoryID = req.params.id;
    const hasNotes = await Note.findOne({ categoryID });
    if (!hasNotes) {
      const result = await Category.findByIdAndDelete(categoryID);
      if (!result) return res.status(404).json({ message: "Category not found" });
      return res.status(200).json({ message: "Category deleted successfully" });
    } else {
      return res
        .status(409)
        .json({ message: "Cannot delete a category with notes. Clear notes first." });
    }
  } catch (error) {
    console.error("error in deleteCateg controller: ", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getAllCateg(req, res) {
  try {
    const Categs = await Category.find({ userID: req.params.userid });
    return res.status(200).json(Categs);
  } catch (error) {
    console.error("error in getAllCateg controller: ", error);
    res.status(500).json({ message: "internal server error" });
  }
}
