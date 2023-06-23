

import ShowCharacters from '../components/ShowCharacters';

export default function Home() {
  return (
    <div className="flex flex-wrap gap-5 justify-center items-center">
      <div className='flex-center'>
        <div>
          Get characters from data base
        </div>
        <ShowCharacters />

      </div>

    </div>
  )
}

