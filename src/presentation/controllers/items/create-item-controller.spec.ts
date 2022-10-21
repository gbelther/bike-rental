import { faker } from "@faker-js/faker";
import { CreateItem } from "../../../domain/use-cases/items/create-item-use-case";
import { CreateItemController } from "./create-item-controller";

class CreateItemSpy implements CreateItem {
  params: any;

  async execute(params: {
    name: string;
    description: string;
    price: number;
  }): Promise<void> {
    this.params = params;
  }
}

type SutReturn = {
  sut: CreateItemController;
  createItemUseCase: CreateItemSpy;
};

const makeSut = (): SutReturn => {
  const createItemUseCase = new CreateItemSpy();
  const sut = new CreateItemController(createItemUseCase);
  return {
    sut,
    createItemUseCase,
  };
};

describe("CreateOrderController", () => {
  it("should call CreateItem correctly", async () => {
    const { sut, createItemUseCase } = makeSut();
    const sutParams = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: 20,
    };
    await sut.handle(sutParams);
    expect(createItemUseCase.params).toEqual(sutParams);
  });

  it("should return 201 if CreateItem succeeds", async () => {
    const { sut } = makeSut();
    const sutParams = {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: 20,
    };
    const httpResponse = await sut.handle(sutParams);
    expect(httpResponse).toEqual({ statusCode: 201 });
  });

  it("should return 400 if CreateItem fails", async () => {
    const { sut, createItemUseCase } = makeSut();
    jest.spyOn(createItemUseCase, "execute").mockImplementationOnce(() => {
      throw new Error();
    });
    const sutParams = {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: 20,
    };
    const httpResponse = await sut.handle(sutParams);
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new Error(),
    });
  });
});
