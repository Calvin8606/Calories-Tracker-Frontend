import React, { useState } from 'react';
import { searchFood, getBrandedNutrients, getCommonNutrients } from '../apis/api';

// Define types for the component
interface FoodItem {
  tagId?: string;
  foodName: string;
  brandName?: string;
  nixItemId?: string;
}

interface Nutrient {
  foodName: string;
  calories: number;
  protein: number;
  servingWeightGrams: number;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [nutrientData, setNutrientData] = useState<Nutrient | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      handleSearch(value); // Fetch results as user types
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
      console.error('Error in handleSearch:', error);
    }
  };

  const fetchNutrients = async (item: FoodItem) => {
    try {
      let nutrients: Nutrient;
      if (item.nixItemId) {
        // Fetch nutrients for branded items by nixItemId
        nutrients = await getBrandedNutrients(item.nixItemId);
        console.log('Branded Nutrient Response:', nutrients);
      } else {
        // Fetch nutrients for common items by foodName
        nutrients = await getCommonNutrients(item.foodName);
        console.log('Common Nutrient Response:', nutrients);
      }
      setNutrientData(nutrients);
    } catch (error) {
      console.error('Error fetching nutrients:', error);
    }
  };

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

      {/* Dropdown for displaying search results */}
      {isDropdownVisible && searchResults.length > 0 && (
        <div className="absolute top-full left-0 z-20 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
          {searchResults.map((item, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => fetchNutrients(item)}
            >
              <p className="font-bold">{item.foodName}</p>
              <p className="text-sm text-gray-500">
                Brand: {item.brandName ? item.brandName : 'Common Item'}
              </p>
            </div>
          ))}
        </div>
      )}

      {nutrientData && (
        <div className="w-full mt-6 p-4 border border-gray-300 rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-2">Nutrient Information</h3>
          <p>Food Name: {nutrientData.foodName}</p>
          <p>Calories: {nutrientData.calories}</p>
          <p>Protein: {nutrientData.protein}g</p>
          <p>Serving Weight: {nutrientData.servingWeightGrams}g</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
