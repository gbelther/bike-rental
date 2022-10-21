import { CreateItem } from "../../../domain/use-cases/items/create-item-use-case";
import { HttpResponse, HttpStatusCode } from "../../protocols/http";
import { Controller } from "../../protocols/controller";

export class CreateItemController implements Controller {
  constructor(private readonly createItem: CreateItem) {}

  async handle(
    httpRequest: CreateItemController.HttpRequest
  ): Promise<HttpResponse> {
    try {
      await this.createItem.execute({
        name: httpRequest.name,
        description: httpRequest.description,
        price: httpRequest.price,
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

namespace CreateItemController {
  export type HttpRequest = {
    name: string;
    description: string;
    price: number;
  };
}
