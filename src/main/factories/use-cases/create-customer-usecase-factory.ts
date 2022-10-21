import { CreateCustomerUseCase } from "../../../domain/use-cases/create-customer-use-case";
import { BcryptjsAdapter } from "../../../infra/cryptography/bcryptjs-adapter";
import { bcrypterAdapterFactory } from "../cryptography/bcrypter-adapter-factory";
import { customersRepositoryFactory } from "../repositories/customers-repository-factory";

export const createCustomerUseCaseFactory = (): CreateCustomerUseCase =>
  new CreateCustomerUseCase(
    customersRepositoryFactory(),
    bcrypterAdapterFactory()
  );
