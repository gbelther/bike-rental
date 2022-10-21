import { CreateItemController } from "../../../presentation/controllers/create-item-controller";
import { createItemsUseCaseFactory } from "../use-cases/create-items-usecase-factory";

export const createItemControllerFactory = (): CreateItemController =>
  new CreateItemController(createItemsUseCaseFactory());
