import { Order } from "../../entities/order";
import { ItemsRepository } from "../../repositories/items-repository";
import { OrdersRepository } from "../../repositories/orders-repository";

export class CreateOrderUseCase implements CreateOrder {
  constructor(
    readonly itemsRepository: ItemsRepository,
    readonly ordersRepository: OrdersRepository
  ) {}

  async execute(params: CreateOrder.Params): Promise<CreateOrder.Result> {
    if (!params.orderItems || params.orderItems.length === 0) throw new Error('Order empty')
    const order = new Order(params.cpf);
    for (let orderItem of params.orderItems) {
      const item = await this.itemsRepository.findById(orderItem.itemId);
      if (!item) throw new Error("Item not found");
      order.addItem(item, orderItem.quantity);
    }
    await this.ordersRepository.create(order);
  }
}

export interface CreateOrder {
  execute: (params: CreateOrder.Params) => Promise<CreateOrder.Result>;
}

namespace CreateOrder {
  export type Params = {
    cpf: string;
    orderItems: { itemId: string; quantity: number }[];
  };

  export type Result = void;
}
