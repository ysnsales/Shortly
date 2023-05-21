import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";
import { getRanking, getUsersInfo, signIn, signUp } from "../controllers/users.controller.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const usersRouter = Router();

usersRouter.post("/signup", validateSchema(signUpSchema), signUp);
usersRouter.post("/signin", validateSchema(signInSchema), signIn);
usersRouter.get("/users/me", authValidation, getUsersInfo);
usersRouter.get("/ranking", getRanking)

export default usersRouter;