"use client"
import React, { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

interface SearchProps {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Search: React.FC<SearchProps> = ({ placeholders, onChange, onSubmit }) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [placeholders]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <form
      className="relative rounded-md shadow max-w-[400px] md:w-[350px] bg-white"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="py-2 px-4 bg-transparent w-full text-base font-light rounded-md text-black"
        placeholder={`${placeholders[currentPlaceholder]} ...`}
        value={value}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="absolute right-3 top-[7px] text-2xl text-gray-600 disabled:text-gray-100"
        // disabled={!value}
      >
        <IoIosSearch />
      </button>
    </form>
  );
};

export default Search;
