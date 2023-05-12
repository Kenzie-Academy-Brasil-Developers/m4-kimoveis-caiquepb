import { z } from "zod";

const categoriesSchema = z.object({
    id: z.number(),
    name: z.string().max(45),
});

const categoriesRequestSchema = categoriesSchema.omit({ id: true });
const categoriesListSchema = z.array(categoriesSchema);

export { categoriesSchema, categoriesRequestSchema, categoriesListSchema };
