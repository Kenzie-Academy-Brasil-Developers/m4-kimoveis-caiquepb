import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const ensureEmailIsValidMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
    const email: string = request.body.email;

    const repository: Repository<User> = AppDataSource.getRepository(User);

    if (email) {
        const isValid: User | null = await repository.findOneBy({ email: email });

        if (isValid) {
            throw new AppError("Email already exists", 409);
        }
    }

    return next();
};

export default ensureEmailIsValidMiddleware;
