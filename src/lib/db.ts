import mysql from "mysql2/promise";

interface QueryOptions {
  query: string;
  values?: any[];
}

export async function makeQuery({ query,
  values = [] }: QueryOptions) {

  const dbconnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error: any) {
    throw new Error(error.code);
  }
}
