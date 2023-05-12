import { Repository } from "typeorm";
import { RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { TRealEstate } from "../../interfaces/realEstates.interface";

const listSchedulesService = async (id: number) => {
    const realEstatesRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

    const schedules: TRealEstate | null = await realEstatesRepository.findOne({
        where: {
            id: id,
        },
        relations: {
            schedules: {
                user: true,
            },
            address: true,
            category: true,
        },
    });

    if (!schedules) {
        throw new AppError("RealEstate not found", 404);
    }

    return schedules;
};

export default listSchedulesService;
