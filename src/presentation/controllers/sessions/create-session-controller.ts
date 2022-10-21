import { CreateSession } from "../../../domain/use-cases/sessions/create-session-use-case";
import { HttpResponse, HttpStatusCode } from "../../protocols/http";
import { Controller } from "../../protocols/controller";

export class CreateSessionController implements Controller {
  constructor(readonly createSession: CreateSession) {}

  async handle(
    httpRequest: CreateSessionController.HttpRequest
  ): Promise<HttpResponse> {
    try {
      const session = await this.createSession.execute({
        email: httpRequest.email,
        password: httpRequest.password,
      });

      return {
        statusCode: HttpStatusCode.ok,
        body: session,
      };
    } catch (error) {
      return {
        statusCode: HttpStatusCode.badRequest,
        body: error,
      };
    }
  }
}

namespace CreateSessionController {
  export type HttpRequest = {
    email: string;
    password: string;
  };
}
