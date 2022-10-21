import { v4 as uuidV4 } from "uuid";
import { Order } from "../../../domain/entities/order";
import { OrderItem } from "../../../domain/entities/order-item";
import { OrdersRepository } from "../../../domain/repositories/orders-repository";
import { DbConnection } from "../../database/db-connection";

export class OrdersRepositoryDatabase implements OrdersRepository {
  constructor(readonly dbConnection: DbConnection) {}

  async create({ cpf, code, date, orderItems }: Order): Promise<void> {
    const orderId = uuidV4();
    await this.dbConnection.query<void>(
      "INSERT INTO orders (id, cpf, code, date) VALUES ($1, $2, $3, $4)",
      [orderId, cpf.value, code, date.toISOString()]
    );
    for (const orderItem of orderItems) {
      await this.dbConnection.query(
        "INSERT INTO order_items (id, id_item, id_order, price, quantity) VALUES ($1, $2, $3, $4, $5)",
        [
          uuidV4(),
          orderItem.itemId,
          orderId,
          orderItem.price,
          orderItem.quantity,
        ]
      );
    }
  }

  async findByCode(code: string): Promise<Order> {
    const [orderData] = await this.dbConnection.query(
      "SELECT * FROM orders WHERE code = $1",
      [code]
    );
    if (!orderData) return undefined;
    const orderItemsData = await this.dbConnection.query(
      "SELECT * FROM order_items WHERE id_order = $1",
      [orderData.id]
    );
    const order = new Order(orderData.cpf);
    const orderItems = orderItemsData.map(
      (orderItemData) =>
        new OrderItem(
          orderItemData.id_item,
          Number(orderItemData.price),
          orderItemData.quantity
        )
    );
    order.orderItems = orderItems;
    return order;
  }

  async listAll(): Promise<Order[]> {
    const ordersData = await this.dbConnection.query("SELECT * FROM orders");
    const orders: Order[] = [];
    for (const orderData of ordersData) {
      const order = await this.findByCode(orderData.code);
      if (order) orders.push(order);
    }
    return orders;
  }
}
