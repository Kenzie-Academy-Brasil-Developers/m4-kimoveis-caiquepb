import { z } from "zod";
import { addressesRequestSchema, addressesSchema } from "../schemas/address.schemas";

type TAddresses = z.infer<typeof addressesSchema>;
type TAddressesRequest = z.infer<typeof addressesRequestSchema>;

export { TAddresses, TAddressesRequest };
