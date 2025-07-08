import { CornerDownRight } from 'lucide-react';
import React, {useState} from 'react';

const PropModalStep2 = ({ formData, setFormData, onBack,  onNext }) => {
    const [street, setStreet] = useState(formData.street || ""); 
    const [city, setCity] = useState(formData.city || ""); 
    const [state, setState] = useState(formData.state || ""); 
    const [pincode, setPincode] = useState(formData.pincode || ""); 
    const [landmark, setLandmark] = useState(formData.landmark || ""); 
    
      const handleNext = () => {
        if (street.trim() && city.trim() && state.trim() && pincode.trim()) {
          setFormData({ ...formData, street , city, state, pincode, landmark}); 
          onNext({...formData, street , city, state, pincode, landmark }); 
        } else {
          alert("All fields are required.");
        }
      };

    return (
        <div>
            <div className='flex items-center gap-1 bg-blue-100 mb-7 -mt-3'>
                <CornerDownRight/>
                <h1 className='font-semibold'>Step 2: Address Details</h1>
            </div>
            <form action="">
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1">Street</label>
                    <input
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input
                        type='Number'
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1">Landmark*</label>
                    <input
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Landmark"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                    />
                </div>
            </form>

            <div className="flex justify-between mt-6">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >Back
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

export default PropModalStep2;