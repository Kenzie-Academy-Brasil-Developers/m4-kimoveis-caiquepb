import { Repository } from "typeorm";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import { TCategoriesList } from "../../interfaces/categories.interface";
import { categoriesListSchema } from "../../schemas/categories.schemas";

const listCategoriesService = async (): Promise<TCategoriesList> => {
    const repository: Repository<Category> = AppDataSource.getRepository(Category);

    const categories: TCategoriesList | null = await repository.find();

    const returnCategories: TCategoriesList = categoriesListSchema.parse(categories);

    return returnCategories;
};

export default listCategoriesService;
