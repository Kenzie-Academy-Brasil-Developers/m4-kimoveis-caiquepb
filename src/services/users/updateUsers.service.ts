import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { usersResponseSchema } from "../../schemas/users.schemas";
import { TUsersResponse } from "../../interfaces/users.interface";

const updateUsersService = async (userId: number, userData: any): Promise<TUsersResponse> => {
    const repository: Repository<User> = AppDataSource.getRepository(User);

    const oldUserData: User | null = await repository.findOneBy({
        id: userId,
    });

    const newUserData = repository.create({
        ...oldUserData,
        ...userData,
    });

    await repository.save(newUserData);

    const returnUser: TUsersResponse = usersResponseSchema.parse(newUserData);

    return returnUser;
};

export default updateUsersService;
