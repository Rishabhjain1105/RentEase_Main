import React, { useState } from "react";
import { Home, User } from "lucide-react";

const Step1 = ({ formData, setFormData, onNext }) => {
  const [role, setRole] = useState(formData.role || ""); // Initialize with existing data

  const handleNext = () => {
    if (role) {
      setFormData({ ...formData, role }); // Update role in formData
      onNext({ role }); // Pass role to the next step
    } else {
      alert("Please select a role to proceed.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
        <p className="mt-2 text-gray-600">
          Please select your account type to proceed with the registration process.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setRole("owner")}
          className={`p-6 border-2 rounded-xl transition-colors flex flex-col items-center ${
            role === "owner" ? "border-blue-500" : "border-gray-200"
          }`}
        >
          <Home className="w-12 h-12 text-blue-600 mb-2" />
          <span className="font-medium text-gray-900">House Owner</span>
          <p className="text-sm text-gray-500 mt-1">
            Select this if you own a property and want to list it for rent.
          </p>
        </button>

        <button
          onClick={() => setRole("tenant")}
          className={`p-6 border-2 rounded-xl transition-colors flex flex-col items-center ${
            role === "tenant" ? "border-blue-500" : "border-gray-200"
          }`}
        >
          <User className="w-12 h-12 text-blue-600 mb-2" />
          <span className="font-medium text-gray-900">Tenant</span>
          <p className="text-sm text-gray-500 mt-1">
            Select this if you are looking for a property to rent.
          </p>
        </button>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1;