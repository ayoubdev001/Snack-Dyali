import { Router } from "express";

import {
  getAllPlats,
  getPlatById,
  createPlat,
  updatePlat,
  deletePlat,
} from "../controllers/plats.controller.js";

import validatePlat from "../middlewares/validate.js";

const router = Router();

router.get("/", getAllPlats);

router.get("/:id", getPlatById);

router.post("/", validatePlat, createPlat);

router.put("/:id", validatePlat, updatePlat);

router.delete("/:id", deletePlat);

export default router;