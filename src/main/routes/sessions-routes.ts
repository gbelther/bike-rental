import { Router } from "express";
import { expressAdaptRoute } from "../adapters/express-adapt-route";
import { createSessionControllerFactory } from "../factories/controllers/create-session-controller-factory";
import { refreshSessionControllerFactory } from "../factories/controllers/refresh-session-controller-factory";

const sessionsRoutes = Router();

sessionsRoutes.post("/", expressAdaptRoute(createSessionControllerFactory()));
sessionsRoutes.post(
  "/refresh",
  expressAdaptRoute(refreshSessionControllerFactory())
);

export { sessionsRoutes };
