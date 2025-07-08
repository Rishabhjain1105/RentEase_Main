import React, { useState } from "react";

const Step5 = ({ formData, setFormData, onSubmit, onBack }) => {
  const [password, setPassword] = useState(formData.password || "");
  const [confirmPassword, setConfirmPassword] = useState(formData.confirmPassword || "");

  const handleSubmit = () => {
    if (!password.trim() || !confirmPassword.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Update the formData with the password fields
    setFormData({ ...formData, password, confirmPassword });

    // Call the onSubmit function to handle the final submission
    onSubmit({ ...formData, password, confirmPassword });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 5: Password</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </form>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step5;