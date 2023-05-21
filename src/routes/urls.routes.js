import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/urls.schema.js";
import { shortenURL } from "../controllers/urls.controller.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";


const urlsRouter = Router();

urlsRouter.post("/urls/shorten", authValidation, validateSchema(urlSchema), shortenURL)

export default urlsRouter;