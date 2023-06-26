'use client'

import {
  useState,
  ChangeEvent
} from 'react';

const DeleteCharacter = () => {
  const [inputId, setInputId] = useState<string>('');

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    setInputId(id);
  };

  const handleClick = async () => {
    if (!inputId) {
      alert('Character Id is required to submit form');
      return;
    }
    const confirmed = window.confirm('Are you sure you want to delete the character?');
    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/deletecharacters?id=${inputId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (response.ok) {
          alert('Character deleted successfully');
        } else {
          alert('Failed to delete the character');
        }
      } catch (error) {
        console.error(error);
        alert('Failed to deleted the character');
      }
    }

  }

  return (
    <div className="flex justify-center items-center mb-4 
                    flex-col space-evenly font-poppins"
    >
      <h2>
        Type the Id of the character to delete:
      </h2>
      <input
        className={` ${!inputId ? 'warning' : ''} w-450 bg-lightsteelblue`}
        type="text"
        name="name"
        placeholder="Character id..."
        value={inputId}
        onChange={handleInputChange}
      ></input>
      <div className='text-blue-500'>
        {!inputId ? 'Id is require to submit input' : ''}
      </div>
      <button type="submit"
        disabled={!inputId}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 
                        px-4 rounded ${!inputId ? 'opacity-50 cursor-not-allowed' : ''
          } mx-auto mt-4`}
        onClick={handleClick}
      >
        Delete
      </button>
    </div>
  )
}

export default DeleteCharacter;
