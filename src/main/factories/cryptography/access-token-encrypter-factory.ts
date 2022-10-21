import { JsonWebTokenAdapter } from "../../../infra/cryptography/json-web-token-adapter";
import { jsonWebTokenAdapterFactory } from "./json-web-token-adapter-factory";

export const accessTokenEncrypterFactory = (): JsonWebTokenAdapter =>
  jsonWebTokenAdapterFactory("fbb498cc9ff28eb2112b18d1c146d79c", "15m");
