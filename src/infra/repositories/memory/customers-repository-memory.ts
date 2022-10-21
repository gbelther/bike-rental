import { Cpf } from "../../../domain/entities/Cpf";
import { Customer } from "../../../domain/entities/Customer";
import { CustomersRepository } from "../../../domain/repositories/customers-repository";

export class CustomersRepositoryMemory implements CustomersRepository {
  customers: Customer[] = [];

  async create(
    cpf: Cpf,
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    this.customers.push({
      cpf,
      name,
      email,
      password,
    });
  }

  async findByEmail(email: string): Promise<Customer | undefined> {
    return this.customers.find(customer => customer.email === email);
  }
}
