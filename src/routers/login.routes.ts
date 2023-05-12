import { Router } from "express";
import loginController from "../controllers/login.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { loginRequestSchema } from "../schemas/login.schemas";

const loginRouter = Router();

loginRouter.post("", ensureDataIsValidMiddleware(loginRequestSchema), loginController);

export default loginRouter;
