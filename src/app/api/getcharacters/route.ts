import { makeQuery } from "@/lib/db";
/* import { NextApiRequest } from 'next'; */

export async function GET(request: Request) {

  const characters = await makeQuery({
    query: `SELECT *
        FROM characters`,
    values: [],
  });

  return new Response(JSON.stringify(characters));
}
