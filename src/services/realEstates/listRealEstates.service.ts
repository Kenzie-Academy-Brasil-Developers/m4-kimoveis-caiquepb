import { Repository } from "typeorm";
import { RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import { TRealEstateList } from "../../interfaces/realEstates.interface";
import { realEstatesListSchema } from "../../schemas/realEstates.schemas";

const listRealEstatesService = async (): Promise<TRealEstateList> => {
    const repository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

    const realEstates: TRealEstateList | null = await repository.find({
        relations: {
            address: true,
        },
    });

    const returnRealEstates: TRealEstateList = realEstatesListSchema.parse(realEstates);

    return returnRealEstates;
};

export default listRealEstatesService;
