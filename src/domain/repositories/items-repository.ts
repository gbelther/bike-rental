import { Item } from "../entities/Item";

export interface ItemsRepository {
  create: (name: string, description: string, price: number) => Promise<void>;
  findById: (itemId: string) => Promise<Item | undefined>;
  listAll: () => Promise<Item[]>;
}
