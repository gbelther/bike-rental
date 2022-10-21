import { sign, verify } from "jsonwebtoken";
import { Decrypter } from "../../domain/cryptography/decrypter";
import { Encrypter } from "../../domain/cryptography/encrypter";

export class JsonWebTokenAdapter implements Encrypter, Decrypter {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: string | number
  ) {}

  async encrypt(text: string): Promise<string> {
    return sign({ email: text }, this.secret, { expiresIn: this.expiresIn });
  }

  async decrypt(textEncrypted: string): Promise<string> {
    return verify(textEncrypted, this.secret) as any;
  }
}
