import { Repository } from "typeorm";
import { TUsersResponseList } from "../../interfaces/users.interface";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { usersResponseListSchema } from "../../schemas/users.schemas";

const listUsersService = async (): Promise<TUsersResponseList> => {
    const repository: Repository<User> = AppDataSource.getRepository(User);

    const users: User[] | null = await repository.find();

    const returnUsers = usersResponseListSchema.parse(users);

    return returnUsers;
};

export default listUsersService;
