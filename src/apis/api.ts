import axios from "axios";

const BASE_URL = "http://localhost:8080/api"; // Adjusted base URL

export const registerUser = async (data: {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const token = response.data.token;
    localStorage.setItem("authToken", token);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const updateUserProfile = async (data: {
  goal: string;
  gender: string;
  heightFeet: number;
  heightInches: number;
  weightLbs: number;
  activityLevel: string;
}) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}/profile/submit`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting questionaire:", error);
    throw error;
  }
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found in local storage");
    return;
  }

  try {
    const response = await axios.get(`${BASE_URL}/profile/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const err = error as Error;
    console.error("Error fetching user profile:", err.message);
    throw error;
  }
};

export const getUserDetails = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found in local storage");
    throw new Error("User not authenticated");
  }

  try {
    const response = await axios.get(`${BASE_URL}/user/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const updatePhoneNumber = async (phoneNumber: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${BASE_URL}/user/update-phone`,
    { phoneNumber },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updatePassword = async (newPassword: string) => {
  const token = localStorage.getItem("token"); // Ensure the token is correctly retrieved
  if (!token) {
    console.error("Token not found");
    throw new Error("User is not authenticated");
  }

  try {
    const response = await axios.put(
      `${BASE_URL}/user/update-password`,
      { password: newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

const SEARCH_URL = "http://localhost:8080/api/nutrition";

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
  brandName?: string;
  servingWeightGrams: number;
}

// Function to search food items
// Function to search food items
export const searchFood = async (query: string): Promise<FoodItem[]> => {
  try {
    const response = await axios.get(`${SEARCH_URL}/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};

// Function to get nutrients for branded items by nixItemId
export const getBrandedNutrients = async (
  nixItemId: string
): Promise<Nutrient> => {
  try {
    const response = await axios.get(
      `${SEARCH_URL}/food/branded/${nixItemId}/nutrients`
    );
    const data = response.data;

    console.log("Branded Nutrient Response:", data); // Log the response for debugging

    return {
      foodName: data.foodName || "",
      brandName: data.brandName || "",
      calories: parseFloat(data.calories) || 0,
      protein: parseFloat(data.protein) || 0,
      servingWeightGrams: parseFloat(data.servingWeightGrams) || 0,
    };
  } catch (error) {
    console.error("Error fetching branded nutrients:", error);
    throw error;
  }
};

// Function to get nutrients for common items by foodName
export const getCommonNutrients = async (
  foodName: string
): Promise<Nutrient> => {
  try {
    const response = await axios.post(
      `${SEARCH_URL}/food/common/${foodName}/nutrients`
    );
    console.log("Raw common nutrient response:", response.data); // Add this line

    const data = response.data;

    console.log("Parsed Common Nutrient Response:", data); // Debugging line

    return {
      foodName: data.foodName || "",
      calories: parseFloat(data.calories) || 0,
      protein: parseFloat(data.protein) || 0,
      servingWeightGrams: parseFloat(data.servingWeightGrams) || 0,
    };
  } catch (error) {
    console.error("Error fetching common nutrients:", error);
    throw error;
  }
};

// Fetch calories data for a specific date
export const getCaloriesForDate = async (date: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found in local storage");
    return;
  }

  try {
    const response = await axios.get(`${BASE_URL}/calories/date/${date}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching calories for date:", error);
    throw error;
  }
};

// Fetch calories data for the previous day
export const getCaloriesForPreviousDay = async (date: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found in local storage");
    return;
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/calories/date/${date}/previous`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching previous day's calories:", error);
    throw error;
  }
};

// Fetch calories data for the next day
export const getCaloriesForNextDay = async (date: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found in local storage");
    return;
  }

  try {
    const response = await axios.get(`${BASE_URL}/calories/date/${date}/next`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching next day's calories:", error);
    throw error;
  }
};

export const addFoodEntry = async (date: string, foodItem: FoodItem) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found in local storage");
    return;
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/calories/date/${date}/addFood`,
      foodItem, // Send foodItem directly without JSON.stringify
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding food entry:", error);
    throw error;
  }
};

export const removeFoodEntry = async (foodEntryId: number) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found in local storage");
    return;
  }

  try {
    const response = await axios.delete(
      `${BASE_URL}/calories/food/${foodEntryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting food entry:", error);
    throw error;
  }
};
