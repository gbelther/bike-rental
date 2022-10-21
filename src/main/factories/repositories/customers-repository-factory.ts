import { CustomersRepository } from "../../../domain/repositories/customers-repository";
import { PostgresConnectionAdapter } from "../../../infra/database/postgres-connection-adapter";
import { CustomersRepositoryDatabase } from "../../../infra/repositories/database/customers-repository-database";

export const customersRepositoryFactory = (): CustomersRepository =>
  new CustomersRepositoryDatabase(new PostgresConnectionAdapter());
