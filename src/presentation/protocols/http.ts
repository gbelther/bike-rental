export type HttpResponse = {
  statusCode: number;
  body?: any;
};

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  forbidden = 403,
  serverError = 500,
}
