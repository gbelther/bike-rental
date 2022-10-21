import { Decrypter } from "../../cryptography/decrypter";
import { Encrypter } from "../../cryptography/encrypter";

export class RefreshSessionUseCase implements RefreshSession {
  constructor(
    private readonly decrypterRefresh: Decrypter,
    private readonly encrypterRefresh: Encrypter
  ) {}

  async execute(params: RefreshSession.Params): Promise<RefreshSession.Result> {
    const dataDecrypted = await this.decrypterRefresh.decrypt(
      params.refreshToken
    );

    if (!dataDecrypted || !dataDecrypted.email) {
      throw new Error("Acesso negado");
    }

    const customerEmail = dataDecrypted.email;

    const accessToken = await this.encrypterRefresh.encrypt(customerEmail);
    return { accessToken };
  }
}

export interface RefreshSession {
  execute: (params: RefreshSession.Params) => Promise<RefreshSession.Result>;
}

export namespace RefreshSession {
  export type Params = {
    refreshToken: string;
  };

  export type Result = {
    accessToken: string;
  };
}
