import { Router } from "express";
import { createSchedulesController, listSchedulesController } from "../controllers/schedules.controllers";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureIsAdminMiddleware from "../middlewares/ensureIsAdmin.middlewate";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { schedulesRequestSchema } from "../schemas/schedules.schemas";

const schedulesRouter = Router();

schedulesRouter.post("", ensureTokenIsValidMiddleware, ensureDataIsValidMiddleware(schedulesRequestSchema), createSchedulesController);
schedulesRouter.get("/realEstate/:id", ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, listSchedulesController);

export default schedulesRouter;
