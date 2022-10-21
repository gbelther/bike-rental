import { v4 as uuidV4 } from "uuid";
import { Cpf } from "../../../domain/entities/Cpf";
import { Customer } from "../../../domain/entities/Customer";
import { CustomersRepository } from "../../../domain/repositories/customers-repository";
import { DbConnection } from "../../database/db-connection";

export class CustomersRepositoryDatabase implements CustomersRepository {
  constructor(readonly dbConnection: DbConnection) {}

  async create(
    cpf: Cpf,
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    await this.dbConnection.query(
      "INSERT INTO customers (id, cpf, name, email, password) VALUES ($1, $2, $3, $4, $5)",
      [uuidV4(), cpf.value, name, email, password]
    );
  }

  async findByEmail(email: string): Promise<Customer | undefined> {
    const [customerData] = await this.dbConnection.query('SELECT * FROM customers WHERE email = $1', [email]);
    return customerData || undefined;
  }
}
