import React from "react";

interface FoodItem {
  id?: number;
  foodName?: string;
  name: string;
  calories: number;
  protein: number;
  servingWeightGrams: number;
}

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  nutrientData: FoodItem;
  servings: string;
  onServingsChange: (value: string) => void;
  onAdd: (item: FoodItem) => void;
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  nutrientData,
  servings,
  onServingsChange,
  onAdd,
}) => {
  if (!isVisible) return null;

  // Convert servings to a number for calculations, default to 1 if empty
  const servingsNum = parseFloat(servings) || 1;

  // Adjust values based on servings input
  const adjustedItem: FoodItem = {
    ...nutrientData,
    calories: nutrientData.calories * servingsNum,
    protein: nutrientData.protein * servingsNum,
    servingWeightGrams: nutrientData.servingWeightGrams * servingsNum,
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Nutrient Information</h2>
        <p className="mb-2">Food Name: {adjustedItem.name}</p>
        <p className="mb-2">Calories: {adjustedItem.calories}</p>
        <p className="mb-2">Protein: {adjustedItem.protein}g</p>
        <p className="mb-2">
          Serving Weight: {adjustedItem.servingWeightGrams}g
        </p>

        <div className="flex items-center mb-4">
          <label className="mr-2">Servings:</label>
          <input
            type="text"
            value={servings}
            onChange={(e) => onServingsChange(e.target.value)}
            className="border p-1 rounded w-full"
            placeholder="Enter servings"
            style={{ MozAppearance: "textfield" }}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => onAdd(adjustedItem)}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
