import { ListItems } from "../../../domain/use-cases/items/list-items-use-case";
import { HttpResponse, HttpStatusCode } from "../../protocols/http";
import { Controller } from "../../protocols/controller";

export class ListItemsController implements Controller {
  constructor(private readonly listItems: ListItems) {}

  async handle(): Promise<HttpResponse> {
    try {
      const items = await this.listItems.execute();
      if (items.length === 0) {
        return {
          statusCode: HttpStatusCode.noContent,
        };
      }

      return {
        statusCode: HttpStatusCode.ok,
        body: items,
      };
    } catch (error) {
      return {
        statusCode: HttpStatusCode.badRequest,
        body: error,
      };
    }
  }
}
