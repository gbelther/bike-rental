import { faker } from "@faker-js/faker";
import { CustomersRepositoryMemory } from "../../../infra/repositories/memory/customers-repository-memory";
import { Hasher } from "../../cryptography/hasher";
import { CreateCustomerUseCase } from "./create-customer-use-case";

class HasherSpy implements Hasher {
  text: string;

  async hash(text: string): Promise<string> {
    this.text = text;
    return `${text}-hashed`;
  }
}

type SutTypes = {
  sut: CreateCustomerUseCase;
  customersRepositoryMemory: CustomersRepositoryMemory;
  hasher: HasherSpy;
};

const makeSut = (): SutTypes => {
  const hasher = new HasherSpy();
  const customersRepositoryMemory = new CustomersRepositoryMemory();
  const sut = new CreateCustomerUseCase(customersRepositoryMemory, hasher);
  return {
    sut,
    customersRepositoryMemory,
    hasher,
  };
};

describe("CreateCustomerUseCase", () => {
  it("should throw if Cpf is invalid", async () => {
    const { sut } = makeSut();
    const promise = sut.execute({
      cpf: "any_cpf",
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    await expect(promise).rejects.toThrow(new Error("CPF Inválido"));
  });

  it("should call CustomersRepository(create) correctly", async () => {
    const { sut, customersRepositoryMemory } = makeSut();
    const customersCreateSpy = jest.spyOn(customersRepositoryMemory, "create");
    await sut.execute({
      cpf: "861.648.406-00",
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    expect(customersCreateSpy).toHaveBeenCalled();
  });

  it("should call Hasher correctly", async () => {
    const { sut, hasher } = makeSut();
    const hasherSpy = jest.spyOn(hasher, "hash");
    const params = {
      cpf: "861.648.406-00",
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await sut.execute(params);
    expect(hasherSpy).toHaveBeenCalledWith(params.password);
  });

  it("should throw if Hasher throws", async () => {
    const { sut, hasher } = makeSut();
    jest.spyOn(hasher, "hash").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.execute({
      cpf: "861.648.406-00",
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    await expect(promise).rejects.toThrow(new Error());
  });
});
