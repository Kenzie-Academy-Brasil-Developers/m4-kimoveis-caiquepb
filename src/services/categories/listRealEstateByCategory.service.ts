import { Repository } from "typeorm";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";

const listRealEstateByCategoryService = async (categoryId: number): Promise<Category | null> => {
    const repository: Repository<Category> = AppDataSource.getRepository(Category);

    const realEstates: Category | null = await repository.findOne({
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
