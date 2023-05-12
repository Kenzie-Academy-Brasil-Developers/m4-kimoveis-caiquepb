import { Request, Response } from "express";
import { TLoginRequest, TLoginResponse } from "../interfaces/login.interface";
import loginService from "../services/login/login.service";

const loginController = async (request: Request, response: Response): Promise<Response> => {
    const loginData: TLoginRequest = request.body;

    const token: TLoginResponse = await loginService(loginData);

    return response.json({ token });
};

export default loginController;
