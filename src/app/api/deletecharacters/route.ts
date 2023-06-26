import { makeQuery } from "@/lib/db";


export async function DELETE(request: Request) {

  const { searchParams } = new URL(request.url);
  const id: string | null = searchParams.get("id");

  if (!id) {
    throw new Error("Invalid id");
  }

  // Parse the id as an integer
  const parsedId: number = parseInt(id, 10);

  if (isNaN(parsedId)) {
    throw new Error("Invalid id");
  }
  const deletedCharacter = await makeQuery({
    query: `DELETE FROM characters WHERE id= ?`,
    values: [id],
  });

  return new Response(JSON.stringify(deletedCharacter));

}
