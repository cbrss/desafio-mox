import express from "express";

import flightController from "../controllers/flightController.js";

const router = express.Router();

router.get("/", flightController.findAll);

router.get("/:codFlight", flightController.find);

router.post("/register", flightController.save);

router.delete("/delete/:codFlight", flightController.delete);

router.put("/edit/:codFlight", flightController.edit);

export default router;
