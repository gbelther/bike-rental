import { Order } from "../entities/order";

export interface OrdersRepository {
  create: (order: Order) => Promise<void>;
  listAll: () => Promise<Order[]>;
  findByCode: (code: string) => Promise<Order | undefined>;
}
