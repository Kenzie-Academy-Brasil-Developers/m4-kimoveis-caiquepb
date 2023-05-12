import { Request, Response } from "express";
import { TRealEstateList, TRealEstateRequest } from "../interfaces/realEstates.interface";
import createRealEstatesService from "../services/realEstates/createRealEstates.service";
import listRealEstatesService from "../services/realEstates/listRealEstates.service";

const createRealEstatesController = async (request: Request, response: Response): Promise<Response> => {
    const realEstateData: TRealEstateRequest = request.body;

    const newRealEstate = await createRealEstatesService(realEstateData);

    return response.status(201).json(newRealEstate);
};

const listRealEstatesController = async (request: Request, response: Response): Promise<Response> => {
    const realEstates: TRealEstateList = await listRealEstatesService();

    return response.json(realEstates);
};

export { createRealEstatesController, listRealEstatesController };
