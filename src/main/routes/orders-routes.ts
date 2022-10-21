import { Router } from "express";
import { expressAdaptRoute } from "../adapters/express-adapt-route";
import { createOrderControllerFactory } from "../factories/controllers/create-order-controller-factory";
import { listOrdersControllerFactory } from "../factories/controllers/list-orders-controller-factory";
import { authMiddlewareFactory } from "../factories/middlewares/auth-middleware-factory";

const ordersRouters = Router();

ordersRouters.get(
  "/",
  authMiddlewareFactory,
  expressAdaptRoute(listOrdersControllerFactory())
);
ordersRouters.post(
  "/",
  authMiddlewareFactory,
  expressAdaptRoute(createOrderControllerFactory())
);

export { ordersRouters };
