import { Hasher } from "../../cryptography/hasher";
import { Cpf } from "../../entities/Cpf";
import { CustomersRepository } from "../../repositories/customers-repository";

export class CreateCustomerUseCase implements CreateCustomer {
  constructor(
    readonly customersRepository: CustomersRepository,
    readonly hasher: Hasher
  ) {}

  async execute(params: CreateCustomer.Params): Promise<void> {
    const customerWithSameEmail = await this.customersRepository.findByEmail(params.email);
    if (customerWithSameEmail) throw new Error('Este e-mail já está em uso');

    const passwordHashed = await this.hasher.hash(params.password);

    await this.customersRepository.create(
      new Cpf(params.cpf),
      params.name,
      params.email,
      passwordHashed
    );
  }
}

export interface CreateCustomer {
  execute: (params: CreateCustomer.Params) => Promise<CreateCustomer.Result>;
}

export namespace CreateCustomer {
  export type Params = {
    cpf: string;
    name: string;
    email: string;
    password: string;
  };

  export type Result = void;
}
