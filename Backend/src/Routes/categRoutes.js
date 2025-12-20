import express from "express";

import {
  getAllCateg,
  deleteCateg,
  addtoCateg,
  clearCateg,
  createCateg,
} from "../Controllers/categControllers.js";

const router = express.Router();

router.get("/:userid", getAllCateg);
router.post("/", createCateg);
router.put("/add", addtoCateg);
router.put("/:id", clearCateg);
router.delete("/:id", deleteCateg);

export default router;
