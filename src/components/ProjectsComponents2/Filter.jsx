import React, { useState } from "react";

const Filter = ({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}) => {
  const categories = [
    "All",
    "Residential",
    "Commercial",
    "Interiors",
    "Urban Design",
  ];
  const [dropdownValue, setDropdownValue] = useState(selectedCategory);

  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);
    setDropdownValue(selected);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 mx-4">
      <div className="flex-wrap space-x-2 mb-2 md:mb-0 hidden md:flex">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-8 py-2 my-2 hover:brightness-125 rounded ${
              selectedCategory === category
                ? "bg-primary text-white font-medium"
                : "bg-gray-400 text-black"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <select
        value={dropdownValue}
        onChange={handleCategoryChange}
        className="md:hidden border border-gray-600 p-2 rounded bg-[#1a1a1a] text-white w-full max-w-xs mb-2"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <input
        type="text"
        className="border border-gray-600 p-2 rounded-lg bg-[#1a1a1a] text-white w-full max-w-xs md:max-w-md"
        placeholder="Search projects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default Filter;
