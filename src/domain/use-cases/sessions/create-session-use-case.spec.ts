import { faker } from "@faker-js/faker";
import { CustomersRepositoryMemory } from "../../../infra/repositories/memory/customers-repository-memory";
import { Encrypter } from "../../cryptography/encrypter";
import { HashComparer } from "../../cryptography/hash-comparer";
import { Cpf } from "../../entities/Cpf";
import { CreateCustomer } from "../customers/create-customer-use-case";
import { CreateSessionUseCase } from "./create-session-use-case";

class EncrypterSpy implements Encrypter {
  params: string;

  async encrypt(text: string): Promise<string> {
    this.params = text;
    return `${text}-encrypted`;
  }
}

class HashComparerSpy implements HashComparer {
  textParam: string;
  hashParam: string;

  async compare(text: string, hash: string): Promise<boolean> {
    this.textParam = text;
    this.hashParam = hash;
    return true;
  }
}

const makeCreateCustomerParams = (): CreateCustomer.Params => ({
  cpf: "338.992.073-00",
  name: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

type SutTypes = {
  sut: CreateSessionUseCase;
  customersRepository: CustomersRepositoryMemory;
  hashComparerSpy: HashComparerSpy;
  encrypterAccessSpy: EncrypterSpy;
  encrypterRefreshSpy: EncrypterSpy;
};

const makeSut = (): SutTypes => {
  const customersRepository = new CustomersRepositoryMemory();
  const encrypterAccessSpy = new EncrypterSpy();
  const encrypterRefreshSpy = new EncrypterSpy();
  const hashComparerSpy = new HashComparerSpy();
  const sut = new CreateSessionUseCase(
    customersRepository,
    encrypterAccessSpy,
    encrypterRefreshSpy,
    hashComparerSpy,
  );
  return {
    sut,
    customersRepository,
    hashComparerSpy,
    encrypterAccessSpy,
    encrypterRefreshSpy,
  };
};

describe("CreateSessionUseCase", () => {
  it("should call CustomersRepository(findByEmail) correctly", async () => {
    const { sut, customersRepository } = makeSut();
    const customer = makeCreateCustomerParams();
    customersRepository.create(
      new Cpf(customer.cpf),
      customer.name,
      customer.email,
      customer.password
    );
    const findByEmailSpy = jest.spyOn(customersRepository, "findByEmail");
    await sut.execute({ email: customer.email, password: customer.password });
    expect(findByEmailSpy).toHaveBeenCalledWith(customer.email);
  });

  it("should throw if account not found", async () => {
    const { sut, customersRepository } = makeSut();
    const customer = makeCreateCustomerParams();
    jest.spyOn(customersRepository, "findByEmail");
    const executePromise = sut.execute({
      email: customer.email,
      password: customer.password,
    });
    await expect(executePromise).rejects.toThrow("Credenciais inválidas");
  });

  it("should call HashComparer(compare) correctly", async () => {
    const { sut, customersRepository, hashComparerSpy } = makeSut();
    const customer = makeCreateCustomerParams();
    customersRepository.create(
      new Cpf(customer.cpf),
      customer.name,
      customer.email,
      customer.password
    );
    await sut.execute({ email: customer.email, password: customer.password });
    expect(hashComparerSpy.hashParam).toEqual(customer.password);
    expect(hashComparerSpy.textParam).toEqual(customer.password);
  });

  it("should throw if HashComparer(compare) throws", async () => {
    const { sut, customersRepository, hashComparerSpy } = makeSut();
    const customer = makeCreateCustomerParams();
    customersRepository.create(
      new Cpf(customer.cpf),
      customer.name,
      customer.email,
      customer.password
    );
    jest.spyOn(hashComparerSpy, "compare").mockResolvedValueOnce(false);
    const promise = sut.execute({
      email: customer.email,
      password: customer.password,
    });
    await expect(promise).rejects.toThrow("Credenciais inválidas");
  });

  it("should call Encrypter(encrypt) correctly", async () => {
    const { sut, customersRepository, encrypterAccessSpy } = makeSut();
    const customer = makeCreateCustomerParams();
    customersRepository.create(
      new Cpf(customer.cpf),
      customer.name,
      customer.email,
      customer.password
    );
    await sut.execute({ email: customer.email, password: customer.password });
    expect(encrypterAccessSpy.params).toEqual(customer.email);
  });

  it("should throw if Encrypter(encrypt) throws", async () => {
    const { sut, customersRepository, encrypterAccessSpy } = makeSut();
    const customer = makeCreateCustomerParams();
    customersRepository.create(
      new Cpf(customer.cpf),
      customer.name,
      customer.email,
      customer.password
    );
    const error = new Error();
    jest.spyOn(encrypterAccessSpy, "encrypt").mockImplementationOnce(() => {
      throw error;
    });
    const promise = sut.execute({
      email: customer.email,
      password: customer.password,
    });
    await expect(promise).rejects.toThrow(error);
  });

  it("should return accessToken correctly", async () => {
    const { sut, customersRepository } = makeSut();
    const customer = makeCreateCustomerParams();
    customersRepository.create(
      new Cpf(customer.cpf),
      customer.name,
      customer.email,
      customer.password
    );
    const result = await sut.execute({
      email: customer.email,
      password: customer.password,
    });
    expect(result.accessToken).toBe(`${customer.email}-encrypted`);
  });
});
