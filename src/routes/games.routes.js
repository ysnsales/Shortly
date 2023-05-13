import { Router } from "express";
import { createGames, getGames } from "../controllers/games.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { gameSchema } from "../schemas/games.schema.js";

const gamesRouter = Router()

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validateSchema(gameSchema), createGames);

export default gamesRouter;