import { OrdersRepository } from "../../../domain/repositories/orders-repository";
import { PostgresConnectionAdapter } from "../../../infra/database/postgres-connection-adapter";
import { OrdersRepositoryDatabase } from "../../../infra/repositories/database/orders-repository-database";

export const ordersRepositoryFactory = (): OrdersRepository =>
  new OrdersRepositoryDatabase(new PostgresConnectionAdapter());
