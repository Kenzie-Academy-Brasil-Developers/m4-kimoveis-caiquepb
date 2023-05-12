import { z } from "zod";
import { usersRequestSchema, usersResponseListSchema, usersResponseSchema, usersSchema, usersUpdateSchema } from "../schemas/users.schemas";

type TUsers = z.infer<typeof usersSchema>;
type TUsersRequest = z.infer<typeof usersRequestSchema>;
type TUsersResponse = z.infer<typeof usersResponseSchema>;
type TUsersResponseList = z.infer<typeof usersResponseListSchema>;
type TUsersUpdate = z.infer<typeof usersUpdateSchema>;

export { TUsers, TUsersRequest, TUsersResponse, TUsersResponseList, TUsersUpdate };
