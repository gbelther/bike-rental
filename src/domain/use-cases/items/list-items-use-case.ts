import { Item } from "../../entities/Item";
import { ItemsRepository } from "../../repositories/items-repository";

export class ListItemsUseCase implements ListItems {
  constructor(readonly ItemsRepository: ItemsRepository) {}

  async execute(): Promise<ListItems.Result> {
    return await this.ItemsRepository.listAll();
  }
}

export interface ListItems {
  execute: () => Promise<ListItems.Result>;
}

namespace ListItems {
  export type Result = Item[];
}