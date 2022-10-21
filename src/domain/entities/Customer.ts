import { Cpf } from "./Cpf";

export class Customer {
  cpf: Cpf;
  name: string;
  email: string;
  password: string;

  constructor(cpfData: string, name: string, email: string, password: string) {
    this.cpf = new Cpf(cpfData);
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
