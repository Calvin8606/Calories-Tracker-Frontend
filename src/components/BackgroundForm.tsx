import React from "react";

interface BackgroundFormProps {
  children: React.ReactNode;
}

const BackgroundForm: React.FC<BackgroundFormProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700 ml-56 pt-16 overflow-hidden">
      <div className="w-full max-w-5xl h-full overflow-y-auto bg-white p-8 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default BackgroundForm;
