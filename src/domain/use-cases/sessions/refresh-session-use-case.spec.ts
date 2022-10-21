import { faker } from "@faker-js/faker";
import { Decrypter } from "../../cryptography/decrypter";
import { Encrypter } from "../../cryptography/encrypter";
import { RefreshSessionUseCase } from "./refresh-session-use-case";

class DecrypterSpy implements Decrypter {
  params: any;
  result: any = { email: faker.internet.email() };

  async decrypt(textEncrypted: string): Promise<any> {
    this.params = textEncrypted;
    return this.result;
  }
}

class EncrypterSpy implements Encrypter {
  params: any;
  result: string;

  async encrypt(text: string): Promise<any> {
    this.params = text;
    return this.result;
  }
}

type SutTypes = {
  sut: RefreshSessionUseCase;
  decrypterRefreshSpy: DecrypterSpy;
  encrypterRefreshSpy: EncrypterSpy;
};

const makeSut = (): SutTypes => {
  const decrypterRefreshSpy = new DecrypterSpy();
  const encrypterRefreshSpy = new EncrypterSpy();
  const sut = new RefreshSessionUseCase(
    decrypterRefreshSpy,
    encrypterRefreshSpy
  );
  return {
    sut,
    decrypterRefreshSpy,
    encrypterRefreshSpy,
  };
};

describe("RefreshSessionUseCase", () => {
  it("should call Decrypt correctly", async () => {
    const { sut, decrypterRefreshSpy } = makeSut();
    const refreshToken = faker.datatype.uuid();
    await sut.execute({ refreshToken });
    expect(decrypterRefreshSpy.params).toBe(refreshToken);
  });

  it("should throw if Decrypt throws", async () => {
    const { sut, decrypterRefreshSpy } = makeSut();
    jest.spyOn(decrypterRefreshSpy, "decrypt").mockImplementationOnce(() => {
      throw new Error();
    });
    const refreshToken = faker.datatype.uuid();
    const promise = sut.execute({ refreshToken });
    await expect(promise).rejects.toThrow(new Error());
  });

  it("should throw if Decrypt returns a falsy data", async () => {
    const { sut, decrypterRefreshSpy } = makeSut();
    jest.spyOn(decrypterRefreshSpy, "decrypt").mockResolvedValueOnce(undefined);
    const refreshToken = faker.datatype.uuid();
    const promise = sut.execute({ refreshToken });
    await expect(promise).rejects.toThrow("Acesso negado");
  });

  it("should throw if Decrypt returns a data without email", async () => {
    const { sut, decrypterRefreshSpy } = makeSut();
    jest.spyOn(decrypterRefreshSpy, "decrypt").mockResolvedValueOnce({});
    const refreshToken = faker.datatype.uuid();
    const promise = sut.execute({ refreshToken });
    await expect(promise).rejects.toThrow("Acesso negado");
  });

  it("should call Encrypt correctly", async () => {
    const { sut, decrypterRefreshSpy, encrypterRefreshSpy } = makeSut();
    const email = faker.internet.email();
    decrypterRefreshSpy.result = { email };
    await sut.execute({ refreshToken: faker.datatype.uuid() });
    expect(encrypterRefreshSpy.params).toBe(email);
  });

  it("should throw if Encrypt throws", async () => {
    const { sut, encrypterRefreshSpy } = makeSut();
    jest.spyOn(encrypterRefreshSpy, "encrypt").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.execute({ refreshToken: faker.datatype.uuid() });
    await expect(promise).rejects.toThrow(new Error());
  });

  it("should return an accessToken correctly", async () => {
    const { sut, encrypterRefreshSpy } = makeSut();
    const accessToken = faker.datatype.uuid();
    encrypterRefreshSpy.result = accessToken;
    const result = await sut.execute({ refreshToken: faker.datatype.uuid() });
    expect(result).toEqual({ accessToken });
  });
});
