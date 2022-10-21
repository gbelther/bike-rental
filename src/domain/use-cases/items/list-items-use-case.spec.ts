import { faker } from "@faker-js/faker";
import { ItemsRepositoryMemory } from "../../../infra/repositories/memory/items-repository-memory";
import { ListItemsUseCase } from "./list-items-use-case";

type SutReturn = {
  sut: ListItemsUseCase;
  itemsRepository: ItemsRepositoryMemory;
};

const makeSut = (): SutReturn => {
  const itemsRepository = new ItemsRepositoryMemory();
  const sut = new ListItemsUseCase(itemsRepository);
  return {
    sut,
    itemsRepository,
  };
};

describe("ListItemsUseCase", () => {
  it("should call ItemsRepository(listAll) correctly", async () => {
    const { sut, itemsRepository } = makeSut();
    const listItemsSpy = jest.spyOn(itemsRepository, "listAll");
    await sut.execute();
    expect(listItemsSpy).toHaveBeenCalled();
  });

  it("should return items correctly", async () => {
    const { sut, itemsRepository } = makeSut();
    const item = {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: 10,
    };
    itemsRepository.items = [item];
    const items = await sut.execute();
    expect(items[0]).toEqual(item);
  });

  it("should throw if ItemsRepository(listAll) throws", async () => {
    const { sut, itemsRepository } = makeSut();
    jest.spyOn(itemsRepository, "listAll").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.execute();
    await expect(promise).rejects.toThrow(new Error());
  });
});
