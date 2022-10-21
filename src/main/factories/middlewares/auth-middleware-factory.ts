import { expressAdaptMiddleware } from "../../adapters/express-adapt-middleware";
import { AuthMiddleware } from "../../middlewares/auth-middleware";
import { accessTokenEncrypterFactory } from "../cryptography/access-token-encrypter-factory";
import { customersRepositoryFactory } from "../repositories/customers-repository-factory";

export const authMiddlewareFactory = expressAdaptMiddleware(
  new AuthMiddleware(
    accessTokenEncrypterFactory(),
    customersRepositoryFactory()
  )
);
