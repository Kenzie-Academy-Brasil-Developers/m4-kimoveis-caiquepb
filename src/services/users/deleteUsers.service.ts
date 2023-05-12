import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";

const deleteUsersService = async (userId: number): Promise<void> => {
    const repository: Repository<User> = AppDataSource.getRepository(User);

    const user = await repository.findOneBy({
        id: userId,
    });

    await repository.softRemove(user!);
};

export default deleteUsersService;
