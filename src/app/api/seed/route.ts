import { NextApiRequest, NextApiResponse } from 'next';
import { makeQuery } from "@/lib/db";
import { seedDatabase } from '@/lib/seedDatabase';

export async function POST(request: Request) {
  try {
    // Seed the database
    const characters = await seedDatabase();

    // Insert characters into the database
    for (const character of characters.data) {
      const { name, status } = character;
      await makeQuery({
        query: `INSERT INTO characters (name, status) VALUES (?, ?)`,
        values: [name, status],
      });
    }

    // Return success response
    return new Response(
      JSON.stringify({ message: 'Database seeding completed.' })
    );
  } catch (error) {
    // Return error response
    return new Response(
      JSON.stringify({ error: 'Database seeding failed.' })
    );
  }
}

