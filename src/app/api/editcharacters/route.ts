import { makeQuery } from "@/lib/db";

interface RequestBody {
  name: string;
  status: string;
}

export async function PATCH(request: Request) {
  const body: RequestBody = await request.json();
  const { searchParams } = new URL(request.url);
  const id: string | null = searchParams.get("id");
  let changeCharacter;

  if (!id) {
    throw new Error("Invalid id");
  }

  // Parse the id as an integer
  const parsedId: number = parseInt(id, 10);

  if (isNaN(parsedId)) {
    throw new Error("Invalid id");
  }

  if (body.name && body.status) {
    changeCharacter = await makeQuery({
      query: 'UPDATE characters SET name = ?, status = ? WHERE id = ?',
      values: [body.name, body.status, id],
    });
  }
  if (!body.name && body.status) {
    changeCharacter = await makeQuery({
      query: 'UPDATE characters SET status = ? WHERE id = ?',
      values: [body.status, id],
    });
  }
  if (body.name && !body.status) {
    changeCharacter = await makeQuery({
      query: 'UPDATE characters SET name = ? WHERE id = ?',
      values: [body.name, id],
    });
  }

  return new Response(JSON.stringify(changeCharacter));
}

