import { Order } from "../../../domain/entities/order";
import { ListOrders } from "../../../domain/use-cases/orders/list-orders-use-case";
import { HttpStatusCode } from "../../protocols/http";
import { ListOrdersController } from "./list-orders-controller";

class ListOrdersSpy implements ListOrders {
  result: Order[] = [];

  async execute(): Promise<Order[]> {
    return this.result;
  }
}

type SutReturn = {
  sut: ListOrdersController;
  listOrder: ListOrdersSpy;
};

const makeSut = (): SutReturn => {
  const listOrder = new ListOrdersSpy();
  const sut = new ListOrdersController(listOrder);
  return {
    sut,
    listOrder,
  };
};

describe("ListOrdersController", () => {
  it("should return 200 if ListOrders succeeds", async () => {
    const { sut, listOrder } = makeSut();
    listOrder.result = [new Order("861.648.406-00")];
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual({
      statusCode: HttpStatusCode.ok,
      body: listOrder.result.map((order) => ({
        ...order,
        cpf: order.cpf.value,
      })),
    });
  });

  it("should return 400 if ListOrders fails", async () => {
    const { sut, listOrder } = makeSut();
    jest.spyOn(listOrder, "execute").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new Error(),
    });
  });
});
