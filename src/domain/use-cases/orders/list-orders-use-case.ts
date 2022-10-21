import { Order } from "../../entities/order"
import { OrdersRepository } from "../../repositories/orders-repository";

export class ListOrdersUseCase implements ListOrders {
  constructor(readonly ordersRepository: OrdersRepository) {}

  async execute(): Promise<ListOrders.Result> {
    return await this.ordersRepository.listAll();
  }
}

export interface ListOrders {
  execute: () => Promise<ListOrders.Result>
}

namespace ListOrders {
  export type Result = Order[];
}