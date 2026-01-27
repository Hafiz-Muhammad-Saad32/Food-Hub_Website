import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <span className="absolute left-4 text-primary text-xl">🔍</span>

        {/* Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search for your favorite food..."
          className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-full font-medium transition-all duration-300 focus:outline-none focus:border-primary focus:shadow-lg"
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-4 text-gray-400 hover:text-primary transition-colors duration-300 text-xl"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
