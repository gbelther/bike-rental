import { CreateSessionUseCase } from "../../../domain/use-cases/create-session-use-case";
import { accessTokenEncrypterFactory } from "../cryptography/access-token-encrypter-factory";
import { bcrypterAdapterFactory } from "../cryptography/bcrypter-adapter-factory";
import { refreshTokenEncrypterFactory } from "../cryptography/refresh-token-encrypter-factory";
import { customersRepositoryFactory } from "../repositories/customers-repository-factory";

export const createSessionUseCaseFactory = (): CreateSessionUseCase =>
  new CreateSessionUseCase(
    customersRepositoryFactory(),
    accessTokenEncrypterFactory(),
    refreshTokenEncrypterFactory(),
    bcrypterAdapterFactory()
  );
