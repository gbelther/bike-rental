import { faker } from "@faker-js/faker";
import { CreateCustomer } from "../../../domain/use-cases/customers/create-customer-use-case";
import { HttpStatusCode } from "../../protocols/http";
import { CreateCustomerController } from "./create-customer-controller";

class CreateCustomerSpy implements CreateCustomer {
  params: any;

  async execute(params: any): Promise<void> {
    this.params = params;
  }
}

type SutTypes = {
  sut: CreateCustomerController;
  createCustomer: CreateCustomerSpy;
};

const makeSut = (): SutTypes => {
  const createCustomer = new CreateCustomerSpy();
  const sut = new CreateCustomerController(createCustomer);
  return {
    sut,
    createCustomer,
  };
};

describe("CreateCustomerController", () => {
  it("should return 400 if createCustomer throws", async () => {
    const { sut, createCustomer } = makeSut();
    jest.spyOn(createCustomer, "execute").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle({
      cpf: "any_cpf",
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    expect(httpResponse.statusCode).toBe(HttpStatusCode.badRequest);
    expect(httpResponse.body).toEqual(new Error());
  });

  it("should return 200 if createCustomer succeeds", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      cpf: "any_cpf",
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    expect(httpResponse.statusCode).toBe(HttpStatusCode.created);
    expect(httpResponse.body).toBeUndefined();
  });

  it("should call CreateCustomer correctly", async () => {
    const { sut, createCustomer } = makeSut();
    const createCustomerSpy = jest.spyOn(createCustomer, "execute");
    const params = {
      cpf: "any_cpf",
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await sut.handle(params);
    expect(createCustomerSpy).toHaveBeenCalledWith({
      cpf: params.cpf,
      name: params.name,
      email: params.email,
      password: params.password,
    });
  });
});
