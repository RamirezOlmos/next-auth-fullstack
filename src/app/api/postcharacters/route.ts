import { makeQuery } from "@/lib/db";

interface RequestBody {
  name: string;
  status: string;
}


export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const addCharacter = await makeQuery({
    query: `INSERT INTO characters (name, status) VALUES (?, ?)`,
    values: [body.name, body.status],
  });

  return new Response(JSON.stringify(addCharacter));
}

