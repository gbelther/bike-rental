import { Encrypter } from "../../cryptography/encrypter";
import { HashComparer } from "../../cryptography/hash-comparer";
import { CustomersRepository } from "../../repositories/customers-repository";

export class CreateSessionUseCase implements CreateSession {
  constructor(
    readonly customersRepository: CustomersRepository,
    readonly encrypterAccess: Encrypter,
    readonly encrypterRefresh: Encrypter,
    readonly hashComparer: HashComparer
  ) {}

  async execute(params: CreateSession.Params): Promise<CreateSession.Result> {
    const account = await this.customersRepository.findByEmail(params.email);
    if (!account) throw new Error("Credenciais inválidas");

    const passwordIsValid = await this.hashComparer.compare(
      params.password,
      account.password
    );
    if (!passwordIsValid) throw new Error("Credenciais inválidas");

    const accessToken = await this.encrypterAccess.encrypt(account.email);
    const refreshToken = await this.encrypterRefresh.encrypt(account.email);
    return {
      accessToken,
      refreshToken,
    };
  }
}

export interface CreateSession {
  execute: (params: CreateSession.Params) => Promise<CreateSession.Result>;
}

export namespace CreateSession {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    accessToken: string;
    refreshToken: string;
  };
}
