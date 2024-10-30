import React, { useEffect, useState } from "react";
import { getUserProfile } from "../apis/api";
import SearchBar from "../components/SearchBar";

interface UserProfile {
  maintenanceCalories: number;
  gainCalories: number;
  lossCalories: number;
  goal: string;
}

interface FoodItem {
  name: string;
  calories: number;
}

const CaloriesTrackerPage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [caloriesConsumed, setCaloriesConsumed] = useState<number>(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile();
        setUserProfile(profileData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const getTotalCalories = () => {
    if (!userProfile) return 0;

    switch (userProfile.goal) {
      case "maintain":
        return userProfile.maintenanceCalories;
      case "gain":
        return userProfile.gainCalories;
      case "lose":
        return userProfile.lossCalories;
      default:
        return 0;
    }
  };

  const getRemainingCalories = () => {
    const totalCalories = getTotalCalories();
    return totalCalories - caloriesConsumed;
  };

  const renderHeader = () => {
    const totalCalories = getTotalCalories();
    const remainingCalories = getRemainingCalories();
    return `${totalCalories} - ${caloriesConsumed} = ${remainingCalories}`;
  };

  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-gray-100">
      {userProfile ? (
        <div className="w-full max-w-lg">
          {/* Header with the calorie calculation */}
          <h1 className="text-center text-2xl font-bold mb-4">
            {renderHeader()}
          </h1>

          {/* SearchBar positioned consistently */}
          <SearchBar />

          {/* Display consumed food items */}
          <div className="mt-4 space-y-2 w-full">
            {foodItems.map((item, index) => (
              <div
                key={index}
                className="p-2 border rounded-md bg-white shadow-md flex justify-between items-center"
              >
                <span>{item.name}</span>
                <span>{item.calories} kcal</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-center text-xl">Loading...</h1>
      )}
    </div>
  );
};

export default CaloriesTrackerPage;
