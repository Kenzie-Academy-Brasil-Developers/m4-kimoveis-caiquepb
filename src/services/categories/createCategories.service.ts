import { Repository } from "typeorm";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import { categoriesSchema } from "../../schemas/categories.schemas";
import { TCategories, TCategoriesRequest } from "../../interfaces/categories.interface";

const createCategoriesService = async (categoryData: TCategoriesRequest): Promise<TCategories> => {
    const repository: Repository<Category> = AppDataSource.getRepository(Category);

    const category: Category = repository.create(categoryData);

    await repository.save(category);

    const returnCategory: TCategories = categoriesSchema.parse(category);

    return returnCategory;
};

export default createCategoriesService;
