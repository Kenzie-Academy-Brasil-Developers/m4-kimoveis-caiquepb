import "reflect-metadata";
import "express-async-errors";
import express, { Application } from "express";
import usersRoutes from "./routers/users.routes";
import { handleErrors } from "./error";
import loginRouter from "./routers/login.routes";
import categoriesRouter from "./routers/categories.routes";
import realEstateRouter from "./routers/realEstate.routes";
import schedulesRouter from "./routers/schedules.routes";

const app: Application = express();
app.use(express.json());
app.use("/users", usersRoutes);
app.use("/login", loginRouter);
app.use("/categories", categoriesRouter);
app.use("/realEstate", realEstateRouter);
app.use("/schedules", schedulesRouter);
app.use(handleErrors);

export default app;
