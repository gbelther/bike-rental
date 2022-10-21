import { OrdersRepositoryMemory } from "../../../infra/repositories/memory/orders-repository-memory";
import { ListOrdersUseCase } from "./list-orders-use-case";
import {Order} from '../../entities/order';

type SutReturn = {
  sut: ListOrdersUseCase;
  ordersRepository: OrdersRepositoryMemory;
};

const makeSut = (): SutReturn => {
  const ordersRepository = new OrdersRepositoryMemory();
  const sut = new ListOrdersUseCase(ordersRepository);
  return {
    sut,
    ordersRepository,
  };
};

describe("ListOrder", () => {
  it("should return an empty array if has not order created", async () => {
    const { sut } = makeSut();
    const orders = await sut.execute();
    expect(orders).toHaveLength(0);
  });

  it("should return orders correctly", async () => {
    const { sut, ordersRepository } = makeSut();
    const order = new Order('861.648.406-00');
    await ordersRepository.create(order)
    const orders = await sut.execute();
    expect(orders).toHaveLength(1);
  });
});
