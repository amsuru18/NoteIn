import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-lg pl-10 pr-10 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          value={value}
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />

        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        </div>

        {value && (
          <button
            onClick={onClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <FiX className="h-4 w-4" />
          </button>
        )}
      </div>

      {value && (
        <button
          onClick={handleSearch}
          className="mt-2 w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Search
        </button>
      )}
    </div>
  );
};

export default SearchBar;
