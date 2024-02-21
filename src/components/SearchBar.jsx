"use client";
import React, { useState } from 'react';
import Link from 'next/link';
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center">
  <input
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={handleChange}
    className="border text-black border-gray-400 rounded-md px-4 py-2 mb-2 sm:mb-0 sm:mr-2 focus:outline-none focus:border-blue-500"
  />
  <Link href={`/searchProduct/${searchTerm}`}>
    <button type="submit" className="sm:px-4 hidden sm:py-2 bg-blue-500 text-white sm:rounded-md">
      Search
    </button>
  </Link>
</form>
  );
};

export default SearchBar;
