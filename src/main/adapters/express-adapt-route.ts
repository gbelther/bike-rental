import { Request, Response } from "express";
import { Controller } from "../../presentation/protocols/controller";

export const expressAdaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const adaptRequest = {
      ...(request.body || {}),
      ...(request.params || {}),
      ...(request.query || {}),
    };
    const httpResponse = await controller.handle(adaptRequest);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      response.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      response
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.body.message });
    }
  };
};
