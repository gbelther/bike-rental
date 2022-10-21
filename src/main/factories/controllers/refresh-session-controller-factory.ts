import { RefreshSessionController } from "../../../presentation/controllers/refresh-session-controller";
import { refreshSessionUseCaseFactory } from "../use-cases/refresh-session-usecase-factory";

export const refreshSessionControllerFactory = (): RefreshSessionController =>
  new RefreshSessionController(refreshSessionUseCaseFactory());
