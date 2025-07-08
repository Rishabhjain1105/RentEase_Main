import { CornerDownRight } from 'lucide-react';
import React, {useState} from 'react';

const RoomModalStep2 = ({ formData, setFormData, onBack,  onNext }) => {
    const [tenantType, setTenantType] = useState(formData.tenantType || ""); 
    const [floor, setFloor] = useState(formData.floor || ""); 
   
    
      const handleNext = () => {
        if (tenantType.trim() && floor.trim() ) {
          setFormData({ ...formData, tenantType , floor }); 
          onNext({...formData, tenantType , floor }); 
        } else {
          alert("All fields are required.");
        }
      };

    return (
        <div>
            <div className='flex items-center gap-1 bg-blue-100 mb-7 -mt-3'>
                <CornerDownRight/>
                <h1 className='font-semibold'>Step 2: Other Details</h1>
            </div>
            <form action="">
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1">Tenant Type</label>
                    <input
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Family, Bachelor, etc."
                        value={tenantType}
                        onChange={(e) => setTenantType(e.target.value)}
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1">Floor</label>
                    <input
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter floor"
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
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

export default RoomModalStep2;