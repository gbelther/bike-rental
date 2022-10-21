import { Router } from "express";
import { expressAdaptRoute } from "../adapters/express-adapt-route";
import { createCustomerControllerFactory } from "../factories/controllers/create-customer-controller-factory";

const customersRoutes = Router();

customersRoutes.post("/", expressAdaptRoute(createCustomerControllerFactory()));

export { customersRoutes };
