import { Repository } from "typeorm";
import { Address, Category, RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import { TRealEstate, TRealEstateRequest } from "../../interfaces/realEstates.interface";
import { AppError } from "../../error";
import { TAddresses } from "../../interfaces/addresses.interface";
import { TCategories } from "../../interfaces/categories.interface";

const createRealEstatesService = async (realEstateData: TRealEstateRequest): Promise<TRealEstate> => {
    const addressesRepository: Repository<Address> = AppDataSource.getRepository(Address);

    const checkAddress: TAddresses | null = await addressesRepository.findOneBy({
        street: realEstateData.address.street,
        zipCode: realEstateData.address.zipCode,
        city: realEstateData.address.city,
        state: realEstateData.address.state,
    });

    if (checkAddress) {
        throw new AppError("Address already exists", 409);
    }

    const newAddress: TAddresses = addressesRepository.create(realEstateData.address);

    await addressesRepository.save(newAddress);

    const categoriesRepository: Repository<Category> = AppDataSource.getRepository(Category);

    const category: TCategories | null = await categoriesRepository.findOneBy({ id: realEstateData.categoryId });

    if (!category) {
        throw new AppError("Category not found", 404);
    }

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

    const newRealEstate: RealEstate = realEstateRepository.create({
        ...realEstateData,
        address: newAddress,
        category: category,
    });

    await realEstateRepository.save(newRealEstate);

    return newRealEstate;
};

export default createRealEstatesService;
