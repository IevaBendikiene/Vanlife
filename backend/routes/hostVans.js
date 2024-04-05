import express from "express";
import * as hostController from "../controllers/hostControllers.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

//GET all host vans
router.get("/", hostController.getHostsVans);

// GET one van
router.get("/:id", hostController.getHostVan);

// //POST add new van
router.post("/", hostController.createHostVan);

// //PATCH - edit one van
router.patch("/:id", hostController.updateHostVan);

// //DELETE one van
router.delete("/:id", hostController.deleteHostVan);

export default router;
