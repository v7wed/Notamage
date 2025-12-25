import express from "express";

import {
  getAllCateg,
  getCateg,
  deleteCateg,
  addtoCateg,
  clearCateg,
  createCateg,
} from "../Controllers/categControllers.js";

const router = express.Router();

router.get("/:id", getCateg);
router.get("/for/:userid", getAllCateg);
router.post("/", createCateg);
router.put("/add", addtoCateg);
router.put("/:id", clearCateg);
router.delete("/:id", deleteCateg);

export default router;
