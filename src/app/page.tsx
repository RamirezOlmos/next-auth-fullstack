

import ShowCharacters from '../components/ShowCharacters';
import DeleteCharacter from '../components/DeleteCharacter';

export default function Home() {
  return (
    <div className="flex flex-wrap gap-5 justify-center items-center">
      <div className='flex-center'>
        <div className='mt-4 mb-4'>
          Get characters from data base
        </div>
        <ShowCharacters />

      </div>
      <div className="flex items-center">
        <div className="ml-44"> {/* Add any desired margin here */}
          <DeleteCharacter />
        </div>
      </div>
    </div>
  )
}

