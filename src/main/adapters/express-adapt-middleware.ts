import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../../presentation/protocols/http";
import { Middleware } from "../../presentation/protocols/middleware";

export const expressAdaptMiddleware =
  (middleware: Middleware) =>
  async (request: Request, response: Response, next: NextFunction) => {
    const requestData = {
      ...(request.headers || {}),
    };
    const httpResponse = await middleware.handle(requestData);
    if (httpResponse.statusCode === HttpStatusCode.ok) {
      next();
    } else {
      response
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.body.message });
    }
  };
