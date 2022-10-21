import { CreateCustomerController } from "../../../presentation/controllers/create-customer-controller";
import { createCustomerUseCaseFactory } from "../use-cases/create-customer-usecase-factory";

export const createCustomerControllerFactory = (): CreateCustomerController =>
  new CreateCustomerController(createCustomerUseCaseFactory());
