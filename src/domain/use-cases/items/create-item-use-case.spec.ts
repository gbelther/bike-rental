import { faker } from "@faker-js/faker";
import { ItemsRepositoryMemory } from "../../../infra/repositories/memory/items-repository-memory";
import { CreateItemUseCase } from "./create-item-use-case";

const makeSutParams = () => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: 10,
})

type SutReturn = {
  sut: CreateItemUseCase;
  itemsRepository: ItemsRepositoryMemory;
};

const makeSut = (): SutReturn => {
  const itemsRepository = new ItemsRepositoryMemory();
  const sut = new CreateItemUseCase(itemsRepository);
  return {
    sut,
    itemsRepository,
  };
};

describe("CreateItemUseCase", () => {
  it("should call ItemsRepository(create) with correct values", async () => {
    const { sut, itemsRepository } = makeSut();
    const createItemSpy = jest.spyOn(itemsRepository, "create");
    const sutParams = makeSutParams();
    await sut.execute(sutParams);
    expect(createItemSpy).toHaveBeenCalledWith(
      sutParams.name,
      sutParams.description,
      sutParams.price
    );
  });

  it("should throw if ItemsRepository(create) throws", async () => {
    const { sut, itemsRepository } = makeSut();
    jest.spyOn(itemsRepository, "create").mockImplementationOnce(() => {
      throw new Error()
    });
    const sutParams = makeSutParams();
    const promise = sut.execute(sutParams);
    await expect(promise).rejects.toThrow(new Error());
  })
});
