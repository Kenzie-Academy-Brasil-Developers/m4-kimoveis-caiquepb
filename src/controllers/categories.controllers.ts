import { Request, Response } from "express";
import { TCategories, TCategoriesRequest, TCategoriesList } from "../interfaces/categories.interface";
import createCategoriesService from "../services/categories/createCategories.service";
import listCategoriesService from "../services/categories/listCategories.service";
import listRealEstateByCategoryService from "../services/categories/listRealEstateByCategory.service";

const createCategoriesController = async (request: Request, response: Response): Promise<Response> => {
    const categoryData: TCategoriesRequest = request.body;

    const newCategory: TCategories = await createCategoriesService(categoryData);

    return response.status(201).json(newCategory);
};

const listCategoriesController = async (request: Request, response: Response): Promise<Response> => {
    const categories: TCategoriesList = await listCategoriesService();

    return response.json(categories);
};

const listRealEstateByCategoryController = async (request: Request, response: Response): Promise<Response> => {
    const categoryId: number = Number(request.params.id)

    const realEstates = await listRealEstateByCategoryService(categoryId);

    return response.json(realEstates);
};

export { createCategoriesController, listCategoriesController, listRealEstateByCategoryController};
