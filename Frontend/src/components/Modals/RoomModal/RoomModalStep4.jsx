import { CornerDownRight } from 'lucide-react';
import React, {useState} from 'react';

const RoomModalStep4 = ({ formData, setFormData, onBack,  onNext }) => {
    // const [isFurnitured, setIsFurnitured] = useState(formData.isFurnitured || ""); 
    // const [hasAttachedBath, setHasAttachedBath] = useState(formData.hasAttachedBath || ""); 

    const [isFurnitured, setIsFurnitured] = useState(
        typeof formData.isFurnitured === "boolean" ? formData.isFurnitured : null
      );
      
    const [hasAttachedBath, setHasAttachedBath] = useState(
    typeof formData.hasAttachedBath === "boolean" ? formData.hasAttachedBath : null
    );
      
    
    const handleNext = () => {
    if ( isFurnitured !== null && hasAttachedBath !== null ) {
        setFormData({ ...formData, isFurnitured , hasAttachedBath }); 
        onNext({...formData, isFurnitured , hasAttachedBath }); 
    } else {
        alert("All fields are required.");
    }
    };

    return (
        <div>
            <div className='flex items-center gap-1 bg-blue-100 mb-7 -mt-3'>
                <CornerDownRight/>
                <h1 className='font-semibold'>Step 4: Other Details</h1>
            </div>
            <form action="">
                {/* Furniture Status */}
                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-3 block">Furniture Status</label>
                    <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => setIsFurnitured(true)}
                        className={`px-6 py-2 rounded-lg border ${
                        isFurnitured === true 
                            ? 'bg-green-500 text-white border-green-600' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        Furnished
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsFurnitured(false)}
                        className={`px-6 py-2 rounded-lg border ${
                        isFurnitured === false 
                            ? 'bg-red-500 text-white border-red-600' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        Unfurnished
                    </button>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-3 block">Bath attached</label>
                    <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => setHasAttachedBath(true)}
                        className={`px-6 py-2 rounded-lg border ${
                        hasAttachedBath === true 
                            ? 'bg-green-500 text-white border-green-600' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        Attached
                    </button>
                    <button
                        type="button"
                        onClick={() => setHasAttachedBath(false)}
                        className={`px-6 py-2 rounded-lg border ${
                        hasAttachedBath === false 
                            ? 'bg-red-500 text-white border-red-600' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        Not Attached
                    </button>
                    </div>
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

export default RoomModalStep4;