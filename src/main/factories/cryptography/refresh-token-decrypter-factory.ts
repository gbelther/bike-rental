import { JsonWebTokenAdapter } from "../../../infra/cryptography/json-web-token-adapter";
import { jsonWebTokenAdapterFactory } from "./json-web-token-adapter-factory";

export const refreshTokenDecrypterFactory = (): JsonWebTokenAdapter =>
  jsonWebTokenAdapterFactory("6b3af3299a1aa57af36430dd10ba33f3", "1d");
