import { Repository } from "typeorm";
import { TUsers, TUsersRequest, TUsersResponse } from "../../interfaces/users.interface";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { usersResponseSchema } from "../../schemas/users.schemas";

const createUsersService = async (userData: TUsersRequest): Promise<TUsersResponse> => {
    const repository: Repository<User> = AppDataSource.getRepository(User);

    const user: TUsers = repository.create(userData);

    await repository.save(user);

    const returnUser: TUsersResponse = usersResponseSchema.parse(user);

    return returnUser;
};

export default createUsersService;
