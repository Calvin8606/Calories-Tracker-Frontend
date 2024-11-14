import React, { useState, useEffect } from "react";
import CenteredForm from "../components/CenteredForm";
import { getUserProfile, updateUserProfile } from "../apis/api";
import { useNavigate } from "react-router-dom";

interface ProfilePageProps {
  setIsProfileComplete: (value: boolean) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ setIsProfileComplete }) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [gender, setGender] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const navigate = useNavigate();

  // Fetch existing profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile();
        setName(profileData.firstName);
        setGoal(profileData.goal);
        setGender(profileData.gender);
        setHeightFeet(profileData.heightFeet.toString());
        setHeightInches(profileData.heightInches.toString());
        setWeightLbs(profileData.weightLbs.toString());
        setActivityLevel(profileData.activityLevel);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal || !gender || !activityLevel) {
      alert("Please fill in all fields!");
      return;
    }

    const heightFeetValue = parseInt(heightFeet, 10);
    const heightInchesValue = parseInt(heightInches, 10);
    const weightLbsValue = parseFloat(weightLbs);

    try {
      await updateUserProfile({
        goal,
        gender,
        heightFeet: heightFeetValue,
        heightInches: heightInchesValue,
        weightLbs: weightLbsValue,
        activityLevel,
      });
      setIsProfileComplete(true);
      navigate("/"); // Redirect to home after update
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-700"
      style={{ marginLeft: "14rem" }} // Adjust for sidebar width (assuming 14rem)
    >
      <CenteredForm title="">
        <h1 className="text-2xl font-bold mb-8 text-center">Hello, {name}!</h1>
        <h1 className="text-4xl font-bold mb-8 text-center">
          Update Your Profile
        </h1>
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          {/* Goal */}
          <div>
            <label className="block mb-2">
              Do you want to gain, lose, or maintain weight?
            </label>
            <select
              className="w-full p-2 border rounded"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <option value="">Select your goal</option>
              <option value="gain">Gain Weight</option>
              <option value="lose">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2">What is your gender?</label>
            <select
              className="w-full p-2 border rounded"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Height */}
          <div>
            <label className="block mb-2">What is your height?</label>
            <div className="flex space-x-2">
              <input
                type="number"
                className="w-1/2 p-2 border rounded"
                value={heightFeet}
                onChange={(e) => setHeightFeet(e.target.value)}
                placeholder="Feet"
                min="0"
              />
              <input
                type="number"
                className="w-1/2 p-2 border rounded"
                value={heightInches}
                onChange={(e) => setHeightInches(e.target.value)}
                placeholder="Inches"
                min="0"
                max="11"
              />
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="block mb-2">What is your weight? (in lbs)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={weightLbs}
              onChange={(e) => setWeightLbs(e.target.value)}
              placeholder="Enter your weight"
              min="0"
            />
          </div>

          {/* Activity Level */}
          <div>
            <label className="block mb-2">How active are you?</label>
            <select
              className="w-full p-2 border rounded"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
            >
              <option value="">Select activity level</option>
              <option value="sedentary">
                Sedentary (little to no exercise)
              </option>
              <option value="lightly">
                Lightly active (light exercise/sports 1-3 days/week)
              </option>
              <option value="moderately">
                Moderately active (moderate exercise/sports 3-5 days/week)
              </option>
              <option value="very">
                Very active (hard exercise/sports 6-7 days a week)
              </option>
              <option value="extra">
                Extra active (very hard exercise, physical job, or training
                twice a day)
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </CenteredForm>
    </div>
  );
};

export default ProfilePage;
