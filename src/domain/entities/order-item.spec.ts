import { OrderItem } from "./order-item";

describe("OrderItem", () => {
  it("should calculate total correctly", () => {
    const orderItem = new OrderItem("1", 10, 2);
    const total = orderItem.getTotal();
    const totalExpected = 2 * 10;
    expect(total).toBe(totalExpected);
  });

  it('should throw if quantity is negative', () => {
    expect(() => new OrderItem('1', 100, -2)).toThrow(new Error('Invalid quantity'))
  })
});
