import { JsonWebTokenAdapter } from "../../../infra/cryptography/json-web-token-adapter";

export const jsonWebTokenAdapterFactory = (
  secret: string,
  expiresIn: string | number
): JsonWebTokenAdapter =>
  new JsonWebTokenAdapter(secret, expiresIn);
