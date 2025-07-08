import { CornerDownRight } from 'lucide-react';
import React, { useState } from 'react';

const PropModalStep3 = ({ formData, setFormData, onBack, onNext, onRentTypeChange }) => {
    // Remove local rentType state - use formData.rentType directly
    // const rentType = formData.rentType;

    const handleNext = () => {
        if (!rentType) {
            alert("Please select a rental type.");
            return;
        }
        onNext(); // Just proceed, no need to pass data as parent already has it
    };

    return (
        <div>
            <div className='flex items-center gap-1 bg-blue-100 mb-7 -mt-3'>
                <CornerDownRight/>
                <h1 className='font-semibold'>Step 3: Rental Type</h1>
            </div>
            
            <div className="flex flex-col mb-4">
                <label className="block font-medium mb-4">Select Rental Type:</label>
                <div className="inline-flex rounded-md justify-around">
                    <button
                        type="button"
                        onClick={() => onRentTypeChange('entire')}
                        className={`px-4 py-2 rounded-l-lg border ${
                            rentType === 'entire' 
                            ? 'bg-green-500 text-white border-black' 
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                    >
                        Entire Property
                    </button>

                    <button
                        type="button"
                        onClick={() => onRentTypeChange('roomwise')}
                        className={`px-4 py-2 rounded-r-lg border ${
                            rentType === 'roomwise' 
                            ? 'bg-green-500 text-white border-black'
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                    >
                        Room Wise
                    </button>
                </div>
            </div>

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

export default PropModalStep3;