import { Repository } from "typeorm";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import { TCategories } from "../../interfaces/categories.interface";

const listRealEstateByCategoryService = async (categoryId: number): Promise<TCategories | null> => {
    const repository: Repository<Category> = AppDataSource.getRepository(Category);

    const realEstates: TCategories | null = await repository.findOne({
        where: {
            id: categoryId,
        },
        relations: {
            realEstate: true,
        },
    });

    return realEstates;
};

export default listRealEstateByCategoryService;
