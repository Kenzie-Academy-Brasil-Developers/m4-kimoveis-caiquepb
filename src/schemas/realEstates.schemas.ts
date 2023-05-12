import { z } from "zod";
import { addressesRequestSchema, addressesSchema } from "./address.schemas";
import { categoriesRequestSchema } from "./categories.schemas";

const realEstatesSchema = z.object({
    id: z.number(),
    sold: z.boolean().default(false),
    value: z.string().or(z.number().positive().default(0)),
    size: z.number().int().positive(),
    createdAt: z.string(),
    updatedAt: z.string(),
    address: addressesRequestSchema,
    category: categoriesRequestSchema,
});

const realEstatesRequestSchema = realEstatesSchema.omit({ id: true, createdAt: true, updatedAt: true, category: true }).extend({ categoryId: z.number() });

const realEstatesListSchema = realEstatesSchema.omit({ address: true, category: true }).extend({ address: addressesSchema }).array();

export { realEstatesSchema, realEstatesRequestSchema, realEstatesListSchema };
