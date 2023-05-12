import { z } from "zod";

const usersSchema = z.object({
    id: z.number(),
    name: z.string().max(45),
    email: z.string().email().max(45),
    admin: z.boolean().default(false),
    password: z.string().max(120),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullish(),
});

const usersRequestSchema = usersSchema.omit({ id: true, createdAt: true, updatedAt: true, deletedAt: true });
const usersResponseSchema = usersSchema.omit({ password: true });
const usersResponseListSchema = z.array(usersResponseSchema);
const usersUpdateSchema = usersSchema.omit({ id: true, admin: true, createdAt: true, deletedAt: true }).partial();

export { usersSchema, usersRequestSchema, usersResponseSchema, usersResponseListSchema, usersUpdateSchema };
