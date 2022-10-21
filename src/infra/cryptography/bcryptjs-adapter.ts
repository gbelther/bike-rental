import { hash, compare } from "bcryptjs";
import { HashComparer } from "../../domain/cryptography/hash-comparer";
import { Hasher } from "../../domain/cryptography/hasher";

export class BcryptjsAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  async hash(text: string): Promise<string> {
    return await hash(text, this.salt);
  }

  async compare(text: string, hash: string): Promise<boolean> {
    return await compare(text, hash);
  }
}
