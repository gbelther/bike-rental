import { ItemsRepository } from "../../../domain/repositories/items-repository";
import { PostgresConnectionAdapter } from "../../../infra/database/postgres-connection-adapter";
import { ItemsRepositoryDatabase } from "../../../infra/repositories/database/items-repository-database";

export const itemsRepositoryFactory = (): ItemsRepository =>
  new ItemsRepositoryDatabase(new PostgresConnectionAdapter());
