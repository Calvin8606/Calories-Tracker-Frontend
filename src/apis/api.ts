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
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const questionnaireInfo = async (data: {
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
