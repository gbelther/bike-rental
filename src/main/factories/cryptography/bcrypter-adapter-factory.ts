import { BcryptjsAdapter } from "../../../infra/cryptography/bcryptjs-adapter";

export const bcrypterAdapterFactory = () => new BcryptjsAdapter(8);
