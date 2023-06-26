'use client'

import {
  useState,
  ChangeEvent
} from 'react';

interface Character {
  id: string;
  name: string;
  status: string;
}

const UserEdit = () => {
  const [inputs, setInputs] = useState<Character>({
    id: '',
    name: '',
    status: '',
  });


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });

  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const gameChange = {
      name: inputs.name,
      status: inputs.status,
    }

    // Validation
    if (!inputs.id) {
      alert('Id is require to submit form')
      return
    }

    event.target.reset();
    try {
      const response = await fetch(
        `http://localhost:3000/api/editcharacters?id=${inputs.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameChange),
      });

      if (!response.ok) {
        throw new Error('Failed to change the character');
      }

      // Check if all the required properties exist
      if (response.ok) {
        setInputs({
          id: '',
          name: '',
          status: '',
        });
        alert('Character change successfully');
      }

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <div className="flex justify-center items-center mb-4 
                    flex-col space-evenly font-poppins"
      >
        <h2 className="pt-10 pb-10 text-black m-0">
          Change Character in database!
        </h2>
        <form className="border border-white rounded-lg h-300 bottom-500 
          w-650 bg-opacity-10 bg-white p-10 pb-300 mb-120 shadow-lg text-aliceblue"
          onSubmit={handleSubmit}>
          <label htmlFor="id">Id: </label>
          <input
            className={` ${inputs.id ? 'warning' : ''} w-450 bg-lightsteelblue`}
            type="text"
            name="id"
            placeholder="Character id..."
            value={inputs.id}
            onChange={handleInputChange}
          ></input>
          <div className='text-red-500'>
            {!inputs.id ? 'Id is require to submit input' : ''}
          </div>
          <label htmlFor="name">Name: </label>
          <input
            className={`w-450 bg-lightsteelblue`}
            type="text"
            name="name"
            placeholder="Character name..."
            value={inputs.name}
            onChange={handleInputChange}
          ></input>
          <label htmlFor="status">Status: </label>
          <input
            className={`w-450 bg-lightsteelblue`}
            name="status"
            placeholder="Character status..."
            value={inputs.status}
            onChange={handleInputChange}
          ></input>
          <div className="flex justify-end mt-4">
            <button type="submit"
              disabled={!inputs.id}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 
                        px-4 rounded ${!inputs.id ? 'opacity-50 cursor-not-allowed' : ''
                } mx-auto mt-4`}
            >
              Change
            </button>
          </div>
        </form>
      </div>
    </>
  )
};

export default UserEdit;
