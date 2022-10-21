import { ListOrdersController } from "../../../presentation/controllers/list-orders-controller";
import { listOrdersUseCaseFactory } from "../use-cases/list-orders-usecase-factory";

export const listOrdersControllerFactory = (): ListOrdersController =>
  new ListOrdersController(listOrdersUseCaseFactory());
