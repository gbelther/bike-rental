import { CreateOrderUseCase } from "../../../domain/use-cases/create-order-use-case";
import { itemsRepositoryFactory } from "../repositories/items-repository-factory";
import { ordersRepositoryFactory } from "../repositories/orders-repository-factory";

export const createOrdersUseCaseFactory = (): CreateOrderUseCase =>
  new CreateOrderUseCase(itemsRepositoryFactory(), ordersRepositoryFactory());
