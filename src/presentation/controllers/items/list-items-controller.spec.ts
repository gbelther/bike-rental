import { faker } from "@faker-js/faker";
import { Item } from "../../../domain/entities/Item";
import { ListItems } from "../../../domain/use-cases/items/list-items-use-case";
import { HttpStatusCode } from "../../protocols/http";
import { ListItemsController } from "./list-items-controller";

class ListItemsSpy implements ListItems {
  result: Item[];

  async execute(): Promise<Item[]> {
    return this.result;
  }
}

type SutReturn = {
  sut: ListItemsController;
  listItems: ListItemsSpy;
};

const makeSut = (): SutReturn => {
  const listItems = new ListItemsSpy();
  const sut = new ListItemsController(listItems);
  return {
    sut,
    listItems,
  };
};

describe("ListItemsController", () => {
  it("should return 200 if ListItems succeeds", async () => {
    const { sut, listItems } = makeSut();
    listItems.result = [
      {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: 10,
      },
    ];
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual({
      statusCode: HttpStatusCode.ok,
      body: listItems.result,
    });
  });

  it("should return 400 if ListItems fails", async () => {
    const { sut, listItems } = makeSut();
    jest.spyOn(listItems, "execute").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new Error(),
    });
  });
});
