import { z } from "zod";
import { scheduleResponseSchema, schedulesListSchema, schedulesRequestSchema, schedulesSchema } from "../schemas/schedules.schemas";

type TSchedules = z.infer<typeof schedulesSchema>;
type TSchedulesRequest = z.infer<typeof schedulesRequestSchema>;
type TSchedulesResponse = z.infer<typeof scheduleResponseSchema>;
type TSchedulesList = z.infer<typeof schedulesListSchema>;

type TIsScheduleValid = {
    id: number;
    date: string;
    hour: string;
};

export { TSchedules, TSchedulesRequest, TSchedulesResponse, TSchedulesList, TIsScheduleValid };
