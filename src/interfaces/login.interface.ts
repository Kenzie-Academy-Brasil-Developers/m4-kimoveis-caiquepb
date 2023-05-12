import { z } from "zod";
import { loginSchemaRequest, loginSchemaResponse } from "../schemas/login.schemas";

type TLoginRequest = z.infer<typeof loginSchemaRequest>;
type TLoginResponse = z.infer<typeof loginSchemaResponse>;

export { TLoginRequest, TLoginResponse };
