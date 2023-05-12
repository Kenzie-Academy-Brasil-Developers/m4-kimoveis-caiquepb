import { Request, Response } from "express";
import createUsersService from "../services/users/createUsers.service";
import { TUsersRequest, TUsersResponse, TUsersResponseList, TUsersUpdate } from "../interfaces/users.interface";
import listUsersService from "../services/users/listUsers.service";
import updateUsersService from "../services/users/updateUsers.service";
import deleteUsersService from "../services/users/deleteUsers.service";
import { AppError } from "../error";

const createUsersController = async (request: Request, response: Response): Promise<Response> => {
    const userData: TUsersRequest = request.body;

    const newUser: TUsersResponse = await createUsersService(userData);

    return response.status(201).json(newUser);
};

const listUsersController = async (request: Request, response: Response): Promise<Response> => {
    const users: TUsersResponseList = await listUsersService();

    return response.json(users);
};

const updateUsersController = async (request: Request, response: Response): Promise<Response> => {
    const userId: number = Number(request.params.id);

    const userData: TUsersUpdate = request.body;

    const users = await updateUsersService(userId, userData);

    return response.json(users);
};

const deleteUsersController = async (request: Request, response: Response): Promise<Response> => {
    const userId: number = Number(request.params.id);

    const users = await deleteUsersService(userId);

    return response.status(204).send();
};

export { createUsersController, listUsersController, updateUsersController, deleteUsersController };