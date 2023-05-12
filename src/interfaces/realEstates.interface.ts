import { z } from "zod";
import { realEstatesListSchema, realEstatesRequestSchema, realEstatesSchema } from "../schemas/realEstates.schemas";

type TRealEstate = z.infer<typeof realEstatesSchema>;
type TRealEstateRequest = z.infer<typeof realEstatesRequestSchema>;
type TRealEstateList = z.infer<typeof realEstatesListSchema>;

export { TRealEstate, TRealEstateRequest, TRealEstateList };
