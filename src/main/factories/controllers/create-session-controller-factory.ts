import { CreateSessionController } from "../../../presentation/controllers/create-session-controller";
import { createSessionUseCaseFactory } from "../use-cases/create-session-usecase-factory";

export const createSessionControllerFactory = (): CreateSessionController =>
  new CreateSessionController(createSessionUseCaseFactory());
