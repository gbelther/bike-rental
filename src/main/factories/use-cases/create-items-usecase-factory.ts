import { CreateItemUseCase } from "../../../domain/use-cases/create-item-use-case";
import { itemsRepositoryFactory } from "../repositories/items-repository-factory";

export const createItemsUseCaseFactory = (): CreateItemUseCase =>
  new CreateItemUseCase(itemsRepositoryFactory());
