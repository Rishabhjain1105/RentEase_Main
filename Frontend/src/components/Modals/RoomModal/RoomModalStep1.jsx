import { CornerDownRight } from 'lucide-react';
import React, { useState } from 'react';

const RoomModalStep1 = ({ formData, setFormData, onNext }) => {
    const [roomNumber, setRoomNumber] = useState(formData.roomNumber || "");
    
    const [roomType, setRoomType] = useState(formData.roomType || "");

    const handleNext = () => {
        if (!roomNumber.trim() || !roomType.trim()) {
            alert("All fields are required.");
            return;
        }
        
        const updatedData = { roomNumber,  roomType };
        setFormData({ ...formData, ...updatedData });
        onNext(updatedData);
    };

    return (
        <div>
            <div className='flex items-center gap-1 bg-blue-100 mb-7 -mt-3'>
                <CornerDownRight />
                <h1 className='font-semibold'>Step 1: Basic Details</h1>
            </div>
            
            <div className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Room Number</label>
                    <input
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Room Number"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                    />
                </div>
                
                
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Room Type</label>
                    <input
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 1bhk, 2bhk, maybe "
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RoomModalStep1;