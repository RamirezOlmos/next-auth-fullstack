"use client"

import { useEffect, useState, useRef } from 'react';
import { getCharacter } from 'rickmortyapi';

interface Character {
  id: number
  name: string;
  status: string;
}

const getCharactersFromApi = async () => {
  const theSmiths = await getCharacter([2, 3, 4, 5]);
  return theSmiths;
}


const ShowCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [data, setData] = useState<any>([])


  useEffect(() => {

    const getCharacters = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/getcharacters');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setCharacters(data);
      } catch (error) {
        console.error(error);
      }
    };

    const getCharactersFromApi = async () => {
      const theSmiths = await getCharacter([2, 3, 4, 5]);
      setData(theSmiths);
    }

    getCharacters();
  }, []);

  console.log(data);


  return (
    <div className="flex flex-wrap gap-5">
      {
        characters.map((character) => {
          return (
            <div key={character.id}>
              <p>{`Name: ${character.name}`}</p>
              <p>{`Status: ${character.status}`}</p>
              <hr />
            </div>

          );
        })
      }
    </div>)
}

export default ShowCharacters;
