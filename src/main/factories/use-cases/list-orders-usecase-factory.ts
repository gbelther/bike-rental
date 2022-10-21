import { ListOrdersUseCase } from "../../../domain/use-cases/list-orders-use-case";
import { ordersRepositoryFactory } from "../repositories/orders-repository-factory";

export const listOrdersUseCaseFactory = (): ListOrdersUseCase =>
  new ListOrdersUseCase(ordersRepositoryFactory());
