import { Router } from "express";
import { expressAdaptRoute } from "../adapters/express-adapt-route";
import { createItemControllerFactory } from "../factories/controllers/create-items-controller-factory";
import { listItemsControllerFactory } from "../factories/controllers/list-items-controller-factory";
import { authMiddlewareFactory } from "../factories/middlewares/auth-middleware-factory";

const itemsRoutes = Router();

itemsRoutes.get(
  "/",
  authMiddlewareFactory,
  expressAdaptRoute(listItemsControllerFactory())
);
itemsRoutes.post(
  "/",
  authMiddlewareFactory,
  expressAdaptRoute(createItemControllerFactory())
);

export { itemsRoutes };
