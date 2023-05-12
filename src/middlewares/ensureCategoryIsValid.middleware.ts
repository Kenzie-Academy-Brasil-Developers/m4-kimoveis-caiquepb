import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Category } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const ensureCategoryIsValidMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
    const name: string = request.body.name;

    const repository: Repository<Category> = AppDataSource.getRepository(Category);

    if (name) {
        const isValid: Category | null = await repository.findOne({
            where: {
                name: name,
            },
        });

        if (isValid) {
            throw new AppError("Category already exists", 409);
        }
    }

    return next();
};

export default ensureCategoryIsValidMiddleware;
