import { faker } from "@faker-js/faker";
import { RefreshSession } from "../../../domain/use-cases/sessions/refresh-session-use-case";
import { HttpStatusCode } from "../../protocols/http";
import { RefreshSessionController } from "./refresh-session-controller";

class RefreshSessionSpy implements RefreshSession {
  params: RefreshSession.Params;
  result: RefreshSession.Result;

  async execute(params: RefreshSession.Params): Promise<RefreshSession.Result> {
    this.params = params;
    return this.result;
  }
}

type SutTypes = {
  sut: RefreshSessionController;
  refreshSessionSpy: RefreshSessionSpy;
};

const makeSut = (): SutTypes => {
  const refreshSessionSpy = new RefreshSessionSpy();
  const sut = new RefreshSessionController(refreshSessionSpy);
  return {
    sut,
    refreshSessionSpy,
  };
};

describe("RefreshSessionController", () => {
  it("should throw if refreshToken is not a param", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({ refreshToken: "" });
    expect(httpResponse.statusCode).toBe(HttpStatusCode.badRequest);
    expect(httpResponse.body).toEqual(
      new Error("O parâmetro refreshToken é obrigatório")
    );
  });

  it("should call RefreshSession correctly", async () => {
    const { sut, refreshSessionSpy } = makeSut();
    const refreshToken = faker.datatype.uuid();
    await sut.handle({ refreshToken });
    expect(refreshSessionSpy.params).toEqual({ refreshToken });
  });

  it("should return 403 if RefreshSession throws", async () => {
    const { sut, refreshSessionSpy } = makeSut();
    jest.spyOn(refreshSessionSpy, "execute").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle({
      refreshToken: faker.datatype.uuid(),
    });
    expect(httpResponse.statusCode).toBe(HttpStatusCode.forbidden);
    expect(httpResponse.body).toEqual(new Error());
  });

  it("should return 200 if RefreshSession succeeds", async () => {
    const { sut, refreshSessionSpy } = makeSut();
    const accessToken = faker.datatype.uuid();
    refreshSessionSpy.result = { accessToken };
    const httpResponse = await sut.handle({
      refreshToken: faker.datatype.uuid(),
    });
    expect(httpResponse.statusCode).toBe(HttpStatusCode.ok);
    expect(httpResponse.body).toEqual({ accessToken });
  });
});
