import React, {useState} from "react";
const Step3 = ({ formData, setFormData, onNext, onBack }) => {
    const [email, setEmail] = useState(formData.email || "");
    const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber || "");
  
    const handleNext = () => {
      if (email.trim() && phoneNumber.trim()) {
        setFormData({ ...formData, email, phoneNumber }); // Update formData
        onNext({ email, phoneNumber }); // Pass data to the next step
      } else {
        alert("Please fill in all fields.");
      }
    };
  
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Step 3: Contact Details</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
  
  export default Step3;