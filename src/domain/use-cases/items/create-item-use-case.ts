import { ItemsRepository } from "../../repositories/items-repository";

export class CreateItemUseCase implements CreateItem {
  constructor(readonly itemsRepository: ItemsRepository) {}

  async execute({
    name,
    description,
    price,
  }: CreateItem.Params): Promise<CreateItem.Result> {
    await this.itemsRepository.create(name, description, price);
  }
}

export interface CreateItem {
  execute: (params: CreateItem.Params) => Promise<void>;
}

namespace CreateItem {
  export type Params = {
    name: string;
    description: string;
    price: number;
  };

  export type Result = void;
}
