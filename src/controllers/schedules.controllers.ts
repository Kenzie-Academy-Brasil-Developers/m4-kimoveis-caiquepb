import { Request, Response } from "express";
import createSchedulesService from "../services/schedules/createSchedules.service";
import listSchedulesService from "../services/schedules/listSchedules.service";

const createSchedulesController = async (request: Request, response: Response): Promise<Response> => {
    const schedulesData = request.body;
    const id: number = Number(response.locals.user.id);

    const newSchedule = await createSchedulesService(schedulesData, id);

    return response.status(201).json({ message: "Schedule created" });
};

const listSchedulesController = async (request: Request, response: Response): Promise<Response> => {
    const id: number = Number(request.params.id);

    const schedules = await listSchedulesService(id);

    return response.json(schedules);
};

export { createSchedulesController, listSchedulesController };
