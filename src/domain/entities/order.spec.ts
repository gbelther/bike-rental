import { Item } from "./Item";
import { Order } from "./order";

describe("Order", () => {
  it("should be able to create a Order correctly", () => {
    const order = new Order("861.648.406-00");
    expect(order.code).toBeTruthy();
    expect(order.orderItems).toHaveLength(0);
    expect(order.date).toBeTruthy();
  });

  it("should be able to create a Order with some items", () => {
    const order = new Order("861.648.406-00");
    order.addItem(new Item("1", "any_item_1", "any_item_description_1", 10), 1);
    order.addItem(new Item("2", "any_item_2", "any_item_description_2", 50), 3);
    expect(order.getTotal()).toBe(160);
  });
});
