import { ListItemsController } from "../../../presentation/controllers/list-items-controller";
import { listItemsUseCaseFactory } from "../use-cases/list-items-usecase-factory";

export const listItemsControllerFactory = (): ListItemsController =>
  new ListItemsController(listItemsUseCaseFactory());
