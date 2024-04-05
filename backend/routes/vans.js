import express from "express";
import * as controller from "../controllers/controller.js"

const router = express.Router();

//GET all vans
router.get("/", controller.getVans);

// GET one van
router.get("/:id", controller.getVan);

//POST add new van
router.post("/", controller.createVan);

//PATCH - edit one van
router.patch("/:id", controller.updateVan);

//DELETE one van
router.delete("/:id", controller.deleteVan);

export default router;
