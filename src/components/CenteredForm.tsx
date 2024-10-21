import React from "react";

interface CenteredFormProps {
  title: string;
  children: React.ReactNode;
}

const CenteredForm: React.FC<CenteredFormProps> = ({ title, children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default CenteredForm;
