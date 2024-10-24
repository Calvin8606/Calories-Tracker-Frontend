import React, { useState } from "react";
import CenteredForm from "../components/CenteredForm";
import { questionnaireInfo } from "../apis/api";

const QuestionnairePage: React.FC = () => {
  const [goal, setGoal] = useState("");
  const [gender, setGender] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [activityLevel, setActivityLevel] = useState("");

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
      await questionnaireInfo({
        goal,
        gender,
        heightFeet: heightFeetValue,
        heightInches: heightInchesValue,
        weightLbs: weightLbsValue,
        activityLevel,
      });

      console.log({
        goal,
        gender,
        heightFeet,
        heightInches,
        weightLbs,
        activityLevel,
      });
      alert("Questionnaire submitted!");
    } catch (error) {
      console.error("Questionnaire error:", error);
    }
  };

  return (
    <CenteredForm title="">
      <h1 className="text-4xl font-bold mb-8">Fitness Questionnaire</h1>
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
            <option value="sedentary">Sedentary (little to no exercise)</option>
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
              Extra active (very hard exercise, physical job, or training twice
              a day)
            </option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </CenteredForm>
  );
};

export default QuestionnairePage;
