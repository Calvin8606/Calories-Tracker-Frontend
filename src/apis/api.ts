import axios from "axios";

const BASE_URL = "http://localhost:8080/api/user"; // Adjusted base URL

export const registerUser = async (data: {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, data, {
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
    const response = await axios.post(`${BASE_URL}/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
