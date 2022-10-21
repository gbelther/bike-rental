import { RefreshSessionUseCase } from "../../../domain/use-cases/refresh-session-use-case";
import { refreshTokenDecrypterFactory } from "../cryptography/refresh-token-decrypter-factory";
import { refreshTokenEncrypterFactory } from "../cryptography/refresh-token-encrypter-factory";

export const refreshSessionUseCaseFactory = (): RefreshSessionUseCase =>
  new RefreshSessionUseCase(
    refreshTokenEncrypterFactory(),
    refreshTokenDecrypterFactory()
  );
