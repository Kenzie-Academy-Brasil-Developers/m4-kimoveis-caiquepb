import { Repository } from "typeorm";
import { RealEstate, Schedule, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { TUsers } from "../../interfaces/users.interface";
import { TRealEstate } from "../../interfaces/realEstates.interface";
import { TIsScheduleValid, TSchedulesRequest, TSchedulesResponse } from "../../interfaces/schedules.interface";
import { scheduleResponseSchema } from "../../schemas/schedules.schemas";

const createSchedulesService = async (schedulesData: TSchedulesRequest, id: number): Promise<any> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const userId: TUsers | null = await userRepository.findOneBy({ id: id });

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
    const realEstate: TRealEstate | null = await realEstateRepository.findOneBy({ id: schedulesData.realEstateId });

    if (!realEstate) {
        throw new AppError("RealEstate not found", 404);
    }

    const schedulesRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule);

    const ensureUserScheduleIsValid: TIsScheduleValid | null = await schedulesRepository
        .createQueryBuilder("schedules")
        .where("schedules.userId = :userId", { userId: id })
        .andWhere("schedules.hour = :hour", { hour: schedulesData.hour })
        .andWhere("schedules.date = :date", { date: schedulesData.date })
        .getOne();

    if (ensureUserScheduleIsValid) throw new AppError("User schedule to this real estate at this date and time already exists", 409);

    const ensureScheduleIsValid: TIsScheduleValid | null = await schedulesRepository
        .createQueryBuilder("schedules")
        .where("schedules.realEstateId = :realEstateId", { realEstateId: schedulesData.realEstateId })
        .andWhere("schedules.hour = :hour", { hour: schedulesData.hour })
        .andWhere("schedules.date = :date", { date: schedulesData.date })
        .getOne();

    if (ensureScheduleIsValid) throw new AppError("Schedule to this real estate at this date and time already exists", 409);

    const ensureHourIsValid: string = schedulesData.hour;
    if (!(ensureHourIsValid >= "08:00") || !(ensureHourIsValid <= "18:00")) {
        throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
    }

    const ensureDateIsValid: number = new Date(schedulesData.date).getDay();
    if (ensureDateIsValid <= 0 || ensureDateIsValid >= 6) {
        throw new AppError("Invalid date, work days are monday to friday", 400);
    }

    const newSchedule: TSchedulesResponse = schedulesRepository.create({
        date: schedulesData.date,
        hour: schedulesData.hour,
        realEstate: realEstate!,
        user: userId!,
    });

    await schedulesRepository.save(newSchedule);

    return newSchedule;
};

export default createSchedulesService;
