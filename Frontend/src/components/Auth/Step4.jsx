import React, {useState} from "react";
const Step4 = ({ formData, setFormData, onNext, onBack }) => {
    const [aadharCardNumber, setAadharCardNumber] = useState(formData.aadharCardNumber || "");
    const [address, setAddress] = useState(formData.address || "");
  
    const handleNext = () => {
      if (aadharCardNumber.trim() && address.trim()) {
        setFormData({ ...formData, aadharCardNumber, address }); // Update formData
        onNext({ aadharCardNumber, address }); // Pass data to the next step
      } else {
        alert("Please fill in all fields.");
      }
    };
  
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Step 4: Document Details</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Aadhar Number
            </label>
            <input
              type="text"
              value={aadharCardNumber}
              onChange={(e) => setAadharCardNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">
            Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  export default Step4;