'use client'

import {
  useState,
  ChangeEvent
} from 'react';

interface Character {
  name: string;
  status: string;
  [key: string]: string; // Index signature allowing string indexing
}


const UserPostPage = () => {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [inputs, setInputs] = useState<Character>({
    name: '',
    status: '',
  });

  const [errors, setErrors] = useState<Character>({
    name: '',
    status: '',
  });


  const validate = (inputs: Character) => {
    const errors: Character = {
      name: '',
      status: ''
    };
    if (!inputs.name)
      errors.name = 'Name is require';
    else if (!inputs.status)
      errors.status = 'Status is require';

    return errors;
  };


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });

    const updatedErrors = validate({ ...inputs, [name]: value });
    setErrors(updatedErrors);

    // Enable the button when there are no errors
    const hasErrors = Object.keys(updatedErrors).some((key) => updatedErrors[key] !== '');
    setButtonDisabled(hasErrors);

  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const gameCreated = {
      name: inputs.name,
      status: inputs.status,
    }

    // Validation
    if (!gameCreated.name) {
      alert('Name is require to submit form')
      return
    }
    if (!gameCreated.status) {
      alert('Status is require to submit form')
      return
    }

    event.target.reset();
    try {
      const response = await fetch('http://localhost:3000/api/postcharacters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameCreated),
      });

      if (!response.ok) {
        throw new Error('Failed to create the character');
      }

      // Check if all the required properties exist
      if (gameCreated.name && gameCreated.status) {
        alert('Character created successfully');
      }

      if (!Object.keys(errors).length) {
        setInputs({
          name: '',
          status: '',
        });

        setErrors({
          name: '',
          status: '',
        });
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
          Insert your Character to database!
        </h2>
        <form className="border border-white rounded-lg h-300 bottom-500 
          w-650 bg-opacity-10 bg-white p-10 pb-300 mb-120 shadow-lg text-aliceblue"
          onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            className={` ${errors.name ? 'warning' : ''} w-450 bg-lightsteelblue`}
            type="text"
            name="name"
            placeholder="Character name..."
            value={inputs.name}
            onChange={handleInputChange}
          ></input>
          <div className='text-red-500'> {errors.name}</div>
          <label htmlFor="status">Status: </label>
          <input
            className={` ${errors.name ? 'warning' : ''} w-450 bg-lightsteelblue`}
            name="status"
            placeholder="Character status..."
            value={inputs.status}
            onChange={handleInputChange}
          ></input>
          <div className='text-red-500'> {errors.status}</div>
          <div className="flex justify-end mt-4">
            <button type="submit"
              disabled={buttonDisabled}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 
                        px-4 rounded ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''
                } mx-auto mt-4`}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  )
};

export default UserPostPage;
