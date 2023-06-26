import { getCharacter } from 'rickmortyapi';

export async function seedDatabase(): Promise<any> {
  try {
    // Fetch characters from the API
    const theSmiths = await getCharacter([1, 2, 3, 4, 5]);

    return theSmiths;

  } catch (error) {
    console.error('Database seeding failed:', error);
  }
}


