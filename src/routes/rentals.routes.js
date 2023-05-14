import { Router } from "express";
import { createRentals, deleteRentals, finishRentals, getRentals } from "../controllers/rentals.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { rentalSchema } from "../schemas/rentals.schema.js";


const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateSchema(rentalSchema), createRentals);
rentalsRouter.post("/rentals/:id/return", finishRentals);
rentalsRouter.delete("/rentals/:id", deleteRentals);

export default rentalsRouter;