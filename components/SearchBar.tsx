"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full flex justify-center mt-8">
      <form
        onSubmit={handleSearch}
        className="flex items-center space-x-4 w-full sm:max-w-lg bg-white p-4 rounded-lg shadow-xl"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search blog posts..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3386c] text-gray-700"
        />

        <button
          type="submit"
          className="flex items-center px-6 py-3 bg-[#a3386c] text-white rounded-lg hover:bg-[#8b2c59] transition duration-300"
        >
          <FaSearch className="mr-2 text-lg" />
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
