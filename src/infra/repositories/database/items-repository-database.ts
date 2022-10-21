import { v4 as uuidV4 } from "uuid";
import { Item } from "../../../domain/entities/Item";
import { ItemsRepository } from "../../../domain/repositories/items-repository";
import { DbConnection } from "../../database/db-connection";

export class ItemsRepositoryDatabase implements ItemsRepository {
  constructor(readonly dbConnection: DbConnection) {}

  async create(
    name: string,
    description: string,
    price: number
  ): Promise<void> {
    await this.dbConnection.query(
      "INSERT INTO items (id, name, description, price) VALUES ($1, $2, $3, $4)",
      [uuidV4(), name, description, price]
    );
  }

  async findById(itemId: string): Promise<Item | undefined> {
    const [itemData] = await this.dbConnection.query(
      "SELECT * FROM items WHERE id = $1",
      [itemId]
    );
    if (!itemData) return undefined;
    const item = new Item(
      itemData.id,
      itemData.name,
      itemData.description,
      Number(itemData.price)
    );
    return item;
  }

  async listAll(): Promise<Item[]> {
    const itemsData = await this.dbConnection.query("SELECT * FROM items");
    const items: Item[] = itemsData.map(
      (itemData) =>
        new Item(
          itemData.id,
          itemData.name,
          itemData.description,
          Number(itemData.price)
        )
    );
    return items;
  }
}
