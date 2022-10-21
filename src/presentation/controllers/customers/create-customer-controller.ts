import { CreateCustomer } from "../../../domain/use-cases/customers/create-customer-use-case";
import { HttpResponse, HttpStatusCode } from "../../protocols/http";
import { Controller } from "../../protocols/controller";

export class CreateCustomerController implements Controller {
  constructor(private readonly createCustomer: CreateCustomer) {}

  async handle(
    httpRequest: CreateCustomerController.HttpRequest
  ): Promise<HttpResponse> {
    try {
      await this.createCustomer.execute({
        cpf: httpRequest.cpf,
        name: httpRequest.name,
        email: httpRequest.email,
        password: httpRequest.password,
      });

      return {
        statusCode: HttpStatusCode.created,
      };
    } catch (error) {
      return {
        statusCode: HttpStatusCode.badRequest,
        body: error,
      };
    }
  }
}

namespace CreateCustomerController {
  export type HttpRequest = {
    cpf: string;
    name: string;
    email: string;
    password: string;
  };
}
