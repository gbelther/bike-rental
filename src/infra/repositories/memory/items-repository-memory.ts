import { v4 as uuidV4 } from 'uuid';
import { Item } from "../../../domain/entities/Item";
import { ItemsRepository } from "../../../domain/repositories/items-repository";

export class ItemsRepositoryMemory implements ItemsRepository {
  items: Item[];

  constructor() {
    this.items = [];
  }

  async create(
    name: string,
    description: string,
    price: number
  ): Promise<void> {
    const item = { id: uuidV4(), name, description, price };
    this.items.push(item);
  }

  async findById(itemId: string): Promise<Item | undefined> {
    return this.items.find((item) => item.id === itemId);
  }

  async listAll(): Promise<Item[]> {
    return this.items;
  }
}
