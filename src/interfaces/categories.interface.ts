import { z } from "zod";
import { categoriesSchema, categoriesRequestSchema, categoriesListSchema } from "../schemas/categories.schemas";

type TCategories = z.infer<typeof categoriesSchema>;
type TCategoriesRequest = z.infer<typeof categoriesRequestSchema>;
type TCategoriesList = z.infer<typeof categoriesListSchema>;

export { TCategories, TCategoriesRequest, TCategoriesList };
