import express from "express";

import {
  getAllCateg,
  getCateg,
  deleteCateg,
  addtoCateg,
  clearCateg,
  createCateg,
  updateCateg,
} from "../Controllers/categControllers.js";
import { ApiLimit } from "../Middleware/RateLimiters.js";

const router = express.Router();

router.get("/:id", ApiLimit, getCateg);
router.get("/for/:userid", ApiLimit, getAllCateg);
router.post("/", ApiLimit, createCateg);
router.put("/add", ApiLimit, addtoCateg);
router.put("/:id", ApiLimit, updateCateg);
router.put("/:id/clear", ApiLimit, clearCateg);
router.delete("/:id", ApiLimit, deleteCateg);

export default router;
