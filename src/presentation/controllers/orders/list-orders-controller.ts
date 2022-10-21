import { ListOrders } from "../../../domain/use-cases/orders/list-orders-use-case";
import { HttpResponse, HttpStatusCode } from "../../protocols/http";
import { Controller } from "../../protocols/controller";

export class ListOrdersController implements Controller {
  constructor(private readonly listOrder: ListOrders) {}

  async handle(): Promise<HttpResponse> {
    try {
      const ordersData = await this.listOrder.execute();
      const orders = ordersData.map((orderData) => ({
        ...orderData,
        cpf: orderData.cpf.value,
      }));

      if (orders.length === 0) {
        return {
          statusCode: HttpStatusCode.noContent,
        };
      }

      return {
        statusCode: HttpStatusCode.ok,
        body: orders,
      };
    } catch (error) {
      return {
        statusCode: HttpStatusCode.badRequest,
        body: error,
      };
    }
  }
}
