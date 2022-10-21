import { faker } from "@faker-js/faker";
import { CreateSession } from "../../../domain/use-cases/sessions/create-session-use-case";
import { HttpStatusCode } from "../../protocols/http";
import { CreateSessionController } from "./create-session-controller";

class CreateSessionSpy implements CreateSession {
  params: any;
  accessToken: string;
  refreshToken: string;

  async execute(params: CreateSession.Params): Promise<CreateSession.Result> {
    this.params = params;
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    };
  }
}

type SutTypes = {
  sut: CreateSessionController;
  createSessionSpy: CreateSessionSpy;
};

const makeSut = (): SutTypes => {
  const createSessionSpy = new CreateSessionSpy();
  const sut = new CreateSessionController(createSessionSpy);
  return {
    sut,
    createSessionSpy,
  };
};

describe("CreateSessionController", () => {
  it("should call CreateSession correctly", async () => {
    const { sut, createSessionSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await sut.handle({ email, password });
    expect(createSessionSpy.params).toEqual({ email, password });
  });

  it("should return 400 if CreateSession throws", async () => {
    const { sut, createSessionSpy } = makeSut();
    jest.spyOn(createSessionSpy, "execute").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    expect(httpResponse.statusCode).toBe(HttpStatusCode.badRequest);
    expect(httpResponse.body).toEqual(new Error());
  });

  it("should return 200 if CreateSession succeeds", async () => {
    const { sut, createSessionSpy } = makeSut();
    const accessToken = faker.datatype.uuid();
    const refreshToken = faker.datatype.uuid();
    createSessionSpy.accessToken = accessToken;
    createSessionSpy.refreshToken = refreshToken;
    const httpResponse = await sut.handle({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    expect(httpResponse.statusCode).toBe(HttpStatusCode.ok);
    expect(httpResponse.body).toEqual({ accessToken, refreshToken });
  });
});
