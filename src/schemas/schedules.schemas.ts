import { z } from "zod";
import { usersRequestSchema, usersSchema } from "./users.schemas";
import { realEstatesRequestSchema, realEstatesSchema } from "./realEstates.schemas";

const schedulesSchema = z.object({
    id: z.number(),
    date: z.string(),
    hour: z.string(),
    realEstate: realEstatesRequestSchema,
    user: usersRequestSchema,
});

const scheduleResponseSchema = z.object({
    id: z.number(),
    date: z.string(),
    hour: z.string(),
    realEstate: realEstatesSchema,
    user: usersSchema,
});

const schedulesRequestSchema = schedulesSchema.omit({ id: true, user: true, realEstate: true }).extend({ realEstateId: z.number() });

const schedulesListSchema = z.array(schedulesSchema);

export { schedulesSchema, scheduleResponseSchema, schedulesRequestSchema, schedulesListSchema };
