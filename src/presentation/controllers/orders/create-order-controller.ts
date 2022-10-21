import { CreateOrder } from "../../../domain/use-cases/orders/create-order-use-case";
import { HttpResponse, HttpStatusCode } from "../../protocols/http";
import { Controller } from "../../protocols/controller";

export class CreateOrderController implements Controller {
  constructor(private readonly createOrder: CreateOrder) {}

  async handle(
    httpRequest: CreateOrderController.HttpRequest
  ): Promise<HttpResponse> {
    try {
      await this.createOrder.execute({
        cpf: httpRequest.cpf,
        orderItems: httpRequest.orderItems,
      });

      return { statusCode: HttpStatusCode.created };
    } catch (error) {
      return {
        statusCode: HttpStatusCode.badRequest,
        body: error,
      };
    }
  }
}

namespace CreateOrderController {
  export type HttpRequest = {
    cpf: string;
    orderItems: { itemId: string; quantity: number }[];
  };
}
