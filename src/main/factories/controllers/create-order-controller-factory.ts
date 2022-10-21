import { CreateOrderController } from "../../../presentation/controllers/create-order-controller";
import { createOrdersUseCaseFactory } from "../use-cases/create-orders-usecase-factory";

export const createOrderControllerFactory = (): CreateOrderController =>
  new CreateOrderController(createOrdersUseCaseFactory());
