import { ListItemsUseCase } from "../../../domain/use-cases/list-items-use-case";
import { itemsRepositoryFactory } from "../repositories/items-repository-factory";

export const listItemsUseCaseFactory = (): ListItemsUseCase =>
  new ListItemsUseCase(itemsRepositoryFactory());
