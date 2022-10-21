import { faker } from '@faker-js/faker';
import { ItemsRepositoryMemory } from "../../../infra/repositories/memory/items-repository-memory";
import { OrdersRepositoryMemory } from "../../../infra/repositories/memory/orders-repository-memory";
import { CreateOrderUseCase } from "./create-order-use-case";

const makeItem = () => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.datatype.number(),
})

type SutReturn = {
  sut: CreateOrderUseCase;
  itemsRepository: ItemsRepositoryMemory;
  ordersRepository: OrdersRepositoryMemory;
};

const makeSut = (): SutReturn => {
  const itemsRepository = new ItemsRepositoryMemory();
  const ordersRepository = new OrdersRepositoryMemory();
  const sut = new CreateOrderUseCase(itemsRepository, ordersRepository);
  return {
    sut,
    itemsRepository,
    ordersRepository,
  };
};

describe("CreateOrder", () => {
  it("should throw if orderItems is empty", async () => {
    const { sut } = makeSut();
    const promise = sut.execute({
      cpf: "861.648.406-00",
      orderItems: [],
    });
    await expect(promise).rejects.toThrow(new Error('Order empty'));
  });

  it("should call itemsRepository(findById) correctly", async () => {
    const { sut, itemsRepository } = makeSut();
    const itemFindByIdSpy = jest.spyOn(itemsRepository, 'findById');
    const item = makeItem();
    itemsRepository.items = [item];
    await sut.execute({
      cpf: "861.648.406-00",
      orderItems: [{ itemId: item.id, quantity: 2 }],
    });
    expect(itemFindByIdSpy).toHaveBeenCalledWith(item.id);
  });

  it("should call OrderRepository(create) correctly", async () => {
    const { sut, itemsRepository, ordersRepository } = makeSut();
    const orderCreateSpy = jest.spyOn(ordersRepository, 'create');
    const item = makeItem();
    itemsRepository.items = [item];
    await sut.execute({
      cpf: "861.648.406-00",
      orderItems: [{ itemId: item.id, quantity: 2 }],
    });
    expect(orderCreateSpy).toHaveBeenCalled();
  });

  it("should create an order correctly", async () => {
    const { sut, itemsRepository, ordersRepository } = makeSut();
    const item = makeItem();
    itemsRepository.items = [item];
    await sut.execute({
      cpf: "861.648.406-00",
      orderItems: [{ itemId: item.id, quantity: 2 }],
    });
    const orders = await ordersRepository.listAll();
    expect(orders).toHaveLength(1);
    expect(orders[0].cpf.value).toEqual('861.648.406-00');
    expect(orders[0].orderItems).toHaveLength(1);
    expect(orders[0].orderItems[0].itemId).toEqual(item.id);
  });
});
