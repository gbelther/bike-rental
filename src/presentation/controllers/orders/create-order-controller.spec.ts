import { CreateOrderController } from "./create-order-controller";
import { CreateOrder } from "../../../domain/use-cases/orders/create-order-use-case";

class CreateOrderUseCaseSpy implements CreateOrder {
  params: any;

  async execute(params: {
    cpf: string;
    orderItems: { itemId: string; quantity: number }[];
  }): Promise<void> {
    this.params = params;
  }
}

type SutReturn = {
  sut: CreateOrderController;
  createOrderSpy: CreateOrderUseCaseSpy;
};

const makeSut = (): SutReturn => {
  const createOrderSpy = new CreateOrderUseCaseSpy();
  const sut = new CreateOrderController(createOrderSpy);
  return {
    sut,
    createOrderSpy,
  };
};

describe("Create Order Controller", () => {
  it("should call CreateOrder with correct values", async () => {
    const { sut, createOrderSpy } = makeSut();
    await sut.handle({
      cpf: "861.648.406-00",
      orderItems: [{ itemId: "1", quantity: 2 }],
    });
    expect(createOrderSpy.params).toEqual({
      cpf: "861.648.406-00",
      orderItems: [{ itemId: "1", quantity: 2 }],
    });
  });

  it("should return 200 if CreateOrder succeeds", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      cpf: "861.648.406-00",
      orderItems: [{ itemId: "1", quantity: 2 }],
    });
    expect(httpResponse).toEqual({
      statusCode: 201,
    });
  });

  it("should throw if CreateOrder throws", async () => {
    const { sut, createOrderSpy } = makeSut();
    jest.spyOn(createOrderSpy, "execute").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle({
      cpf: "861.648.406-00",
      orderItems: [{ itemId: "1", quantity: 2 }],
    });
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new Error()
    });
  });
});
