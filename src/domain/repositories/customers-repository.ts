import { Cpf } from "../entities/Cpf";
import { Customer } from "../entities/Customer";

export interface CustomersRepository {
  create: (
    cpf: Cpf,
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  findByEmail: (email: string) => Promise<Customer | undefined>;
}
