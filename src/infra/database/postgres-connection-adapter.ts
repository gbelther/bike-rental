import { Pool } from "pg";
import { DbConnection } from "./db-connection";

export class PostgresConnectionAdapter implements DbConnection {
  pgPool: Pool;

  constructor() {
    const pool = new Pool({
      ssl: {
        rejectUnauthorized: false
      },
      connectionString:
        "postgres://yzwakyvyuwzsid:972eb766943efe4670e2981451afe8edcabd387c1a5cf1880d8826010459bf50@ec2-35-170-21-76.compute-1.amazonaws.com:5432/d8k42elpeadhg1",
    });
    this.pgPool = pool;
  }

  async query<T>(statement: string, values?: any[]): Promise<T[]> {
    const { rows } = await this.pgPool.query<T>(statement, values);
    return rows;
  }
}
