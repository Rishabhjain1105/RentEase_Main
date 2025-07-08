import { CornerDownRight } from 'lucide-react';
import React, {useState} from 'react';

const PropModalStep5 = ({ formData, setFormData, onBack,  onNext }) => {

    const [totalRooms, setTotalRooms] = useState("")
    const handleNext = () => {
      if ( totalRooms.trim() ) {
        setFormData({ ...formData, totalRooms }); 
        onNext({...formData, totalRooms}); 
      } else {
        alert("All fields are required.");
      }
    };

    return (
        <div>
            <div className='cursor-pointer flex items-center gap-1 bg-blue-100 mb-7 -mt-3'>
                <CornerDownRight/>
                <h1 className='font-semibold'>Step 4: Basic Details according to Roomwise</h1>
             </div>
            <form action="">

                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-1">Total Rooms</label>
                    <input
                        type='number'
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 1, 2, 3"
                        value={totalRooms}
                      onChange={(e) => setTotalRooms(e.target.value)}
                    />
                    <p className='cursor-pointer text-sm text-gray-500'>You can update it and manage it later in Rooms Dashboard inside each property</p>
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

export default PropModalStep5;