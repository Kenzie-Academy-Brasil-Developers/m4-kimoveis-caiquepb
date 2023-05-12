import { Router } from "express";
import { createRealEstatesController, listRealEstatesController } from "../controllers/realEstate.controllers";
import ensureIsAdminMiddleware from "../middlewares/ensureIsAdmin.middlewate";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { realEstatesRequestSchema } from "../schemas/realEstates.schemas";

const realEstateRouter = Router();

realEstateRouter.post(
    "",
    ensureTokenIsValidMiddleware,
    ensureIsAdminMiddleware,
    ensureDataIsValidMiddleware(realEstatesRequestSchema),
    createRealEstatesController
);
realEstateRouter.get("", listRealEstatesController);

export default realEstateRouter;
