import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { TLoginRequest, TLoginResponse } from "../../interfaces/login.interface";
import { AppError } from "../../error";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginService = async (loginData: TLoginRequest): Promise<TLoginResponse> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const user: User | null = await userRepository.findOneBy({ email: loginData.email });

    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }

    const passwordMatch: boolean = await bcrypt.compare(loginData.password, user.password);

    if (!passwordMatch) {
        throw new AppError("Invalid credentials", 401);
    }

    const token: TLoginResponse = jwt.sign(
        {
            id: user.id,
            admin: user.admin,
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: "24h",
            subject: user.id.toString(),
        }
    );
    return token;
};

export default loginService;
