import { Router } from "express";
import { createCategoriesController, listCategoriesController, listRealEstateByCategoryController } from "../controllers/categories.controllers";
import ensureNameIsValidMiddleware from "../middlewares/ensureCategoryIsValid.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureIsAdminMiddleware from "../middlewares/ensureIsAdmin.middlewate";
import ensureCategoryIdIsValidMiddleware from "../middlewares/ensureCategoryIdIsValid.middleware";

const categoriesRouter = Router();

categoriesRouter.post("", ensureNameIsValidMiddleware, ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, createCategoriesController);
categoriesRouter.get("", listCategoriesController);
categoriesRouter.get("/:id/realEstate", ensureCategoryIdIsValidMiddleware, listRealEstateByCategoryController);

export default categoriesRouter;
