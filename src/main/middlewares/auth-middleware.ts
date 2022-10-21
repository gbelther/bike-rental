import { Decrypter } from "../../domain/cryptography/decrypter";
import { CustomersRepository } from "../../domain/repositories/customers-repository";
import { HttpResponse, HttpStatusCode } from "../../presentation/protocols/http";
import { Middleware } from "../../presentation/protocols/middleware";

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly customersRepository: CustomersRepository
  ) {}

  async handle(httpRequest: AuthMiddleware.Params): Promise<HttpResponse> {
    try {
      const [, accessToken] = httpRequest.authorization.split(" ");
      if (!accessToken) {
        return {
          statusCode: HttpStatusCode.forbidden,
          body: new Error("Acesso negado"),
        };
      }

      const { email: customerEmail } = await this.decrypter.decrypt(
        accessToken
      );
      if (!customerEmail) {
        return {
          statusCode: HttpStatusCode.forbidden,
          body: new Error("Acesso negado"),
        };
      }

      const customer = await this.customersRepository.findByEmail(
        customerEmail
      );
      if (!customer) {
        return {
          statusCode: HttpStatusCode.forbidden,
          body: new Error("Acesso negado"),
        };
      }

      return {
        statusCode: HttpStatusCode.ok,
      };
    } catch (error) {
      return {
        statusCode: HttpStatusCode.serverError,
        body: error,
      };
    }
  }
}

namespace AuthMiddleware {
  export type Params = {
    authorization?: string;
  };
}
