import { faker } from "@faker-js/faker";
import bcryptjs from "bcryptjs";
import { BcryptjsAdapter } from "./bcryptjs-adapter";

jest.mock("bcryptjs", () => ({
  async hash() {
    return "any_hash";
  },
}));

type SutParams = {
  salt?: number;
};

type SutTypes = {
  sut: BcryptjsAdapter;
};

const makeSut = ({ salt = 2 }: SutParams = {}): SutTypes => {
  const sut = new BcryptjsAdapter(salt);
  return {
    sut,
  };
};

describe("BCryptJsAdapter", () => {
  it("should call Hash correctly", async () => {
    const salt = 2;
    const { sut } = makeSut();
    const hashSpy = jest.spyOn(bcryptjs, "hash");
    const text = faker.random.word();
    await sut.hash(text);
    expect(hashSpy).toHaveBeenCalledWith(text, salt);
  });

  it("should return a text hashed if Hash succeeds", async () => {
    const { sut } = makeSut();
    const textHashed = await sut.hash(faker.random.word());
    expect(textHashed).toBe("any_hash");
  });

  it("should throw if Hash throws", async () => {
    const { sut } = makeSut();
    jest.spyOn(bcryptjs, "hash").mockImplementationOnce(() => {
      throw new Error();
    });
    const hashPromise = sut.hash(faker.random.word());
    await expect(hashPromise).rejects.toThrow(new Error());
  });
});
