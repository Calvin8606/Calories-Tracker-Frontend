import React, { useEffect, useState } from "react";
import { getUserProfile } from "../apis/api";

// Define the interface for user profile data
interface UserProfile {
  maintenanceCalories: number;
  gainCalories: number;
  lossCalories: number;
  goal: string; // Added the goal field
}

// Define the interface for food items consumed
interface FoodItem {
  name: string;
  calories: number;
}

const CaloriesTrackerPage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]); // List of consumed items
  const [caloriesConsumed, setCaloriesConsumed] = useState<number>(0);

  useEffect(() => {
    // Fetch the user profile
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

  // Calculate total calories based on the selected goal
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

  // Calculate remaining calories
  const getRemainingCalories = () => {
    const totalCalories = getTotalCalories();
    return totalCalories - caloriesConsumed;
  };

  // Render the header with the calculation
  const renderHeader = () => {
    const totalCalories = getTotalCalories();
    const remainingCalories = getRemainingCalories();

    return `${totalCalories} - ${caloriesConsumed} = ${remainingCalories}`;
  };

  return (
    <div className="p-4">
      {userProfile ? (
        <div>
          {/* Header with the calorie calculation */}
          <h1 className="text-center text-2xl font-bold mb-4">
            {renderHeader()}
          </h1>
        </div>
      ) : (
        <h1 className="text-center text-xl">Loading...</h1>
      )}
    </div>
  );
};

export default CaloriesTrackerPage;
