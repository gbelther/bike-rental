export interface DbConnection {
  query: <T = any>(statement: string, values?: any[]) => Promise<T[]>;
}
