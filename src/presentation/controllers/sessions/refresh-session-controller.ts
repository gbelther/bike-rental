import { RefreshSession } from "../../../domain/use-cases/sessions/refresh-session-use-case";
import { HttpResponse, HttpStatusCode } from "../../protocols/http";
import { Controller } from "../../protocols/controller";

export class RefreshSessionController implements Controller {
  constructor(readonly refreshSession: RefreshSession) {}

  async handle(
    httpRequest: RefreshSessionController.HttpRequest
  ): Promise<HttpResponse> {
    try {
      if (!httpRequest.refreshToken) {
        return {
          statusCode: HttpStatusCode.badRequest,
          body: new Error('O parâmetro refreshToken é obrigatório')
        }
      }
      
      const refreshedSession = await this.refreshSession.execute({
        refreshToken: httpRequest.refreshToken,
      });

      return {
        statusCode: HttpStatusCode.ok,
        body: refreshedSession,
      };
    } catch (error) {
      return {
        statusCode: HttpStatusCode.forbidden,
        body: error,
      };
    }
  }
}

namespace RefreshSessionController {
  export type HttpRequest = {
    refreshToken: string;
  };
}
