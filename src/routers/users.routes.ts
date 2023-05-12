import { Router } from "express";
import { createUsersController, deleteUsersController, listUsersController, updateUsersController } from "../controllers/users.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { usersRequestSchema, usersUpdateSchema } from "../schemas/users.schemas";
import ensureEmailIsValidMiddleware from "../middlewares/ensureEmailIsValid.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureIsAdminMiddleware from "../middlewares/ensureIsAdmin.middlewate";
import ensureUserIdIsValidMiddleware from "../middlewares/ensureUserIdIsValid.middleware";

const usersRoutes: Router = Router();
usersRoutes.post("", ensureDataIsValidMiddleware(usersRequestSchema), ensureEmailIsValidMiddleware, createUsersController);
usersRoutes.get("", ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, listUsersController);
usersRoutes.patch(
    "/:id",
    ensureUserIdIsValidMiddleware,
    ensureEmailIsValidMiddleware,
    ensureTokenIsValidMiddleware,
    ensureDataIsValidMiddleware(usersUpdateSchema),
    updateUsersController
);
usersRoutes.delete("/:id", ensureUserIdIsValidMiddleware, ensureTokenIsValidMiddleware, ensureIsAdminMiddleware, deleteUsersController);

export default usersRoutes;
