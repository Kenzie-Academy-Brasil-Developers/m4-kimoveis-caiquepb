import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const ensureUserIdIsValidMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
    const id: number = Number(request.params.id);

    const repository: Repository<User> = AppDataSource.getRepository(User);

    if (id) {
        const isValid: User | null = await repository.findOneBy({ id: id });

        if (!isValid) {
            throw new AppError("User not found", 404);
        }
    }

    return next();
};

export default ensureUserIdIsValidMiddleware;
