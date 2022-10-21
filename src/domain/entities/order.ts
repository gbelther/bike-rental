import { Cpf } from "./Cpf";
import { Item } from "./Item";
import { OrderItem } from "./order-item";

export class Order {
  orderItems: OrderItem[];
  code: string;
  cpf: Cpf;
  date: Date;

  constructor(cpfData: string) {
    const date = new Date();

    this.cpf = new Cpf(cpfData);
    this.orderItems = [];
    this.code = this.generateCode(date);
    this.date = date;
  }

  addItem(item: Item, quantity: number) {
    this.orderItems.push(new OrderItem(item.id, item.price, quantity));
  }

  getTotal() {
    return this.orderItems.reduce(
      (total, orderItem) => total + orderItem.getTotal(),
      0
    );
  }

  private generateCode(date: Date) {
    const datePart = `${date.toISOString().replace(/\D+/g, '')}`;
    const randomPart = Math.round(Math.random() * 1000).toString().padStart(3, '0');
    return `${datePart}${randomPart}`;
  }
}
