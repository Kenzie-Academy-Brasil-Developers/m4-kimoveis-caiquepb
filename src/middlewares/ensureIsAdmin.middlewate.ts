import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureIsAdminMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
    const isAdmin: boolean = response.locals.user.admin;

    if (!isAdmin) {
        throw new AppError("Insufficient permission", 403);
    }
    return next();
};

export default ensureIsAdminMiddleware;
