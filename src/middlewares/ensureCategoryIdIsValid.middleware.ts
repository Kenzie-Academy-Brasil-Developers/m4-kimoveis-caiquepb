import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Category } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const ensureCategoryIdIsValidMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
    const id: number = Number(request.params.id);

    const repository: Repository<Category> = AppDataSource.getRepository(Category);

    if (id) {
        const isValid: Category | null = await repository.findOne({
            where: {
                id: id,
            },
        });

        if (!isValid) {
            throw new AppError("Category not found", 404);
        }
    }

    return next();
};

export default ensureCategoryIdIsValidMiddleware;
