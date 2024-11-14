import React, { useState, useEffect, useRef } from "react";
import {
  searchFood,
  getBrandedNutrients,
  getCommonNutrients,
} from "../apis/api";

// Define the types for SearchBar
interface SearchResult {
  tagId?: string;
  foodName: string;
  brandName?: string;
  nixItemId?: string;
}

interface FoodItem {
  id?: number;
  name: string;
  calories: number;
  protein: number;
  servingWeightGrams: number;
}

interface SearchBarProps {
  onAddFoodItem: (item: FoodItem) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onAddFoodItem }) => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      handleSearch(value);
    } else {
      setIsDropdownVisible(false);
      setSearchResults([]);
    }
  };

  const handleSearch = async (searchQuery: string) => {
    try {
      const results = await searchFood(searchQuery);
      setSearchResults(results);
      setIsDropdownVisible(true);
    } catch (error) {
      console.error("Error in handleSearch:", error);
    }
  };

  const fetchNutrients = async (item: SearchResult) => {
    try {
      let nutrientData: FoodItem;
      if (item.nixItemId) {
        const nutrients = await getBrandedNutrients(item.nixItemId);
        nutrientData = {
          name: nutrients.foodName,
          calories: nutrients.calories,
          protein: nutrients.protein,
          servingWeightGrams: nutrients.servingWeightGrams,
        };
      } else {
        const nutrients = await getCommonNutrients(item.foodName);
        nutrientData = {
          name: nutrients.foodName,
          calories: nutrients.calories,
          protein: nutrients.protein,
          servingWeightGrams: nutrients.servingWeightGrams,
        };
      }
      setIsDropdownVisible(false);
      onAddFoodItem(nutrientData); // Open the modal in CaloriesTrackerPage
    } catch (error) {
      console.error("Error fetching nutrients:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto relative">
      <div className="w-full flex mb-1 relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for food..."
          className="flex-grow p-2 border border-gray-300 rounded-l-md z-10"
        />
        <button
          onClick={() => handleSearch(query)}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 z-10"
        >
          Search
        </button>
      </div>

      {isDropdownVisible && searchResults.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 z-20 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto"
        >
          {searchResults.map((item, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => fetchNutrients(item)}
            >
              <p className="font-bold">{item.foodName}</p>
              <p className="text-sm text-gray-500">
                Brand: {item.brandName ? item.brandName : "Common Item"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
