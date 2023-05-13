import { Router } from "express";

const gamesRouter = Router()

gamesRouter.get("/games", getGames);