import React, { useEffect, useState, useCallback } from "react";
import {
  getUserProfile,
  addFoodEntry,
  getCaloriesForDate,
  removeFoodEntry,
} from "../apis/api";
import SearchBar from "../components/SearchBar";
import Modal from "../components/Modal";

interface UserProfile {
  maintenanceCalories: number;
  gainCalories: number;
  lossCalories: number;
  goal: string;
}

interface FoodItem {
  id?: number;
  foodName?: string;
  name: string;
  calories: number;
  protein: number;
  servingWeightGrams: number;
}

interface DailyData {
  totalCalories: number;
  foodEntries: FoodItem[];
}

const CaloriesTrackerPage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [caloriesConsumed, setCaloriesConsumed] = useState<number>(0);
  const [caloriesRemaining, setCaloriesRemaining] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [servings, setServings] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [dailyDataCache, setDailyDataCache] = useState<
    Record<string, DailyData>
  >({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile();
        setUserProfile(profileData);

        // Initialize calories remaining based on total daily goal
        const totalCalories = calculateTotalCalories(profileData);
        setCaloriesRemaining(totalCalories);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const calculateTotalCalories = (profile: UserProfile) => {
    switch (profile.goal) {
      case "maintain":
        return profile.maintenanceCalories;
      case "gain":
        return profile.gainCalories;
      case "lose":
        return profile.lossCalories;
      default:
        return 0;
    }
  };

  const loadDailyData = useCallback(
    async (targetDate: string) => {
      if (dailyDataCache[targetDate]) {
        const cachedData = dailyDataCache[targetDate];
        setCaloriesConsumed(cachedData.totalCalories);
        setCaloriesRemaining(
          calculateTotalCalories(userProfile!) - cachedData.totalCalories
        );
        setFoodItems(cachedData.foodEntries);
        return;
      }

      try {
        const dailyCaloriesData = await getCaloriesForDate(targetDate);

        if (dailyCaloriesData && dailyCaloriesData.foodEntries.length > 0) {
          setCaloriesConsumed(dailyCaloriesData.totalCalories);
          setCaloriesRemaining(
            calculateTotalCalories(userProfile!) -
              dailyCaloriesData.totalCalories
          );
          setFoodItems(dailyCaloriesData.foodEntries);
        } else {
          setCaloriesConsumed(0);
          setCaloriesRemaining(calculateTotalCalories(userProfile!));
          setFoodItems([]);
        }

        setDailyDataCache((prevCache) => ({
          ...prevCache,
          [targetDate]: dailyCaloriesData,
        }));
      } catch (error) {
        console.error("Error fetching daily calories:", error);
        setCaloriesConsumed(0);
        setCaloriesRemaining(calculateTotalCalories(userProfile!));
        setFoodItems([]);
      }
    },
    [dailyDataCache, userProfile]
  );

  useEffect(() => {
    if (userProfile) {
      loadDailyData(date);
    }
  }, [date, userProfile, loadDailyData]);

  const handlePreviousDay = () => {
    const previousDate = new Date(date);
    previousDate.setDate(previousDate.getDate() - 1);
    setDate(previousDate.toISOString().split("T")[0]);
  };

  const handleNextDay = () => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    setDate(nextDate.toISOString().split("T")[0]);
  };

  const addFoodItem = async (item: FoodItem) => {
    const foodItemToSend = { ...item, foodName: item.foodName || item.name };

    try {
      console.log("Adding food item to backend:", foodItemToSend);
      await addFoodEntry(date, foodItemToSend);

      // Immediately update food items and calories without needing a page reload
      setFoodItems((prevItems) => {
        const updatedItems = [...prevItems, foodItemToSend];
        const updatedCaloriesConsumed = updatedItems.reduce(
          (total, currentItem) => total + currentItem.calories,
          0
        );

        setCaloriesConsumed(updatedCaloriesConsumed);
        setCaloriesRemaining(
          calculateTotalCalories(userProfile!) - updatedCaloriesConsumed
        );

        // Update cache
        setDailyDataCache((prevCache) => ({
          ...prevCache,
          [date]: {
            totalCalories: updatedCaloriesConsumed,
            foodEntries: updatedItems,
          },
        }));

        return updatedItems;
      });

      setIsModalVisible(false);
      setSelectedFood(null);
      setServings("");
    } catch (error) {
      console.error("Failed to add food item:", error);
    }
  };

  const removeFoodItem = async (index: number) => {
    const itemToRemove = foodItems[index];

    if (!itemToRemove.id) {
      console.error(
        "Error: Food item does not have an ID and cannot be removed."
      );
      return;
    }

    try {
      console.log("Removing food item from backend:", itemToRemove);
      await removeFoodEntry(itemToRemove.id);

      // Update local state directly after removal
      setFoodItems((prevItems) => {
        const updatedItems = prevItems.filter((_, i) => i !== index);
        const updatedCaloriesConsumed = updatedItems.reduce(
          (total, currentItem) => total + currentItem.calories,
          0
        );

        setCaloriesConsumed(updatedCaloriesConsumed);
        setCaloriesRemaining(
          calculateTotalCalories(userProfile!) - updatedCaloriesConsumed
        );

        // Update cache with the modified data
        setDailyDataCache((prevCache) => ({
          ...prevCache,
          [date]: {
            totalCalories: updatedCaloriesConsumed,
            foodEntries: updatedItems,
          },
        }));

        return updatedItems;
      });
    } catch (error) {
      console.error("Failed to remove food item:", error);
    }
  };

  const renderHeader = () => {
    const totalCalories = calculateTotalCalories(userProfile!);
    return `${totalCalories} - ${caloriesConsumed} = ${caloriesRemaining}`;
  };

  const openModal = (item: FoodItem) => {
    setSelectedFood(item);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedFood(null);
    setServings("");
  };

  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-gray-100 relative">
      {userProfile ? (
        <div className="w-full max-w-lg">
          <h1 className="text-center text-2xl font-bold mb-4">
            {renderHeader()}
          </h1>
          <div className="flex justify-between mb-4">
            <button
              onClick={handlePreviousDay}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Previous Day
            </button>
            <span className="text-lg font-semibold">{date}</span>
            <button
              onClick={handleNextDay}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next Day
            </button>
          </div>
          <SearchBar onAddFoodItem={openModal} />
          <div className="mt-4 space-y-2 w-full">
            {foodItems.map((item, index) => (
              <div
                key={index}
                className="p-2 border rounded-md bg-white shadow-md flex justify-between items-center"
              >
                <div>
                  <span className="block font-bold">{item.name}</span>
                  <span className="text-sm text-gray-500">
                    {item.protein}g protein, {item.servingWeightGrams}g serving
                  </span>
                </div>
                <div className="flex items-center">
                  <span>{item.calories} cal</span>
                  <button
                    onClick={() => removeFoodItem(index)}
                    className="ml-2 text-red-500 font-bold hover:text-red-700"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-center text-xl">Loading...</h1>
      )}
      {isModalVisible && selectedFood && (
        <Modal
          isVisible={isModalVisible}
          onClose={closeModal}
          nutrientData={selectedFood}
          servings={servings}
          onServingsChange={setServings}
          onAdd={addFoodItem}
        />
      )}
    </div>
  );
};

export default CaloriesTrackerPage;
