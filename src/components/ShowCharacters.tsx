"use client"

import { useEffect, useState } from 'react';

interface Character {
  id: number
  name: string;
  status: string;
}



const ShowCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);



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

    getCharacters();
  }, []);



  return (
    <div className="flex flex-col gap-5">
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
