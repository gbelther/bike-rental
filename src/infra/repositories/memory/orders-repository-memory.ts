import { Order } from "../../../domain/entities/order";
import { OrdersRepository } from "../../../domain/repositories/orders-repository";

export class OrdersRepositoryMemory implements OrdersRepository {
  orders: Order[];

  constructor() {
    this.orders = [];
  }

  async create(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async findByCode(code: string): Promise<Order> {
    return this.orders.find(order => order.code === code);
  }

  async listAll(): Promise<Order[]> {
    return this.orders;
  }
}
