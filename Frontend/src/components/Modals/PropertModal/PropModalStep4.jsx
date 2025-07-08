import { CornerDownRight, Info } from 'lucide-react';
import React, { useState } from 'react';

const propertyTypes = [
  {
    name: "Apartment/Flat",
    description: "Residential unit in a multi-story building (e.g., 1BHK, 2BHK). Most common in cities.",
    color: "bg-blue-100 hover:bg-blue-200 text-blue-800"
  },
  {
    name: "Villa",
    description: "Standalone or semi-detached house with private outdoor space. More luxurious and spacious.",
    color: "bg-purple-100 hover:bg-purple-200 text-purple-800"
  },
  {
    name: "Independent House",
    description: "Full house not attached to others. Common in suburban/rural areas.",
    color: "bg-green-100 hover:bg-green-200 text-green-800"
  },
  {
    name: "Duplex",
    description: "Two-floor house with internal staircase. Unique layout.",
    color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
  },
  {
    name: "Studio Apartment",
    description: "Compact unit with combined living space, bedroom and kitchen.",
    color: "bg-pink-100 hover:bg-pink-200 text-pink-800"
  },
  {
    name: "Penthouse",
    description: "Luxurious top-floor apartment (when renting entire unit).",
    color: "bg-red-100 hover:bg-red-200 text-red-800"
  },
  {
    name: "Others",
    description: "Any other type, add about this in description field in step 3",
    color: "bg-orange-100 hover:bg-red-200 text-red-800"
  },
];

const PropModalStep4 = ({ formData, setFormData, onBack, onNext }) => {
  const [propertyType, setPropertyType] = useState(formData.propertyType || "");
  const [description, setDescription] = useState(formData.description || "");
  const [showTooltip, setShowTooltip] = useState(null);

  const handleNext = () => {
    if (propertyType.trim() && description.trim()) {
      setFormData({ ...formData, propertyType, description});
      onNext({ ...formData, propertyType, description });
    } else {
      alert("Please fill all required fields.");
    }
  };

  return (
    <div>
      <div className='flex items-center gap-1 bg-blue-100 mb-7 -mt-3'>
        <CornerDownRight />
        <h1 className='font-semibold'>Step 3: Property Details</h1>
      </div>

      {/* Property Type Selection */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <label className="text-sm font-medium text-gray-700">Property Type</label>
          <div 
            className="relative"
            onMouseEnter={() => setShowTooltip('types')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <Info className="h-4 w-4 text-gray-500 cursor-help" />
            {showTooltip === 'types' && (
              <div className="absolute z-10 left-6 w-64 p-3 bg-white border border-gray-200 rounded-lg shadow-lg">
                <h4 className="font-bold mb-2">Types of Entire Property Rentals</h4>
                <ul className="text-xs space-y-2">
                  {propertyTypes.map(type => (
                    <li key={type.name}>
                      <span className="font-semibold">{type.name}:</span> {type.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {propertyTypes.map((type) => (
            <button
              key={type.name}
              type="button"
              onClick={() => setPropertyType(type.name)}
              className={`p-3 rounded-lg border transition-all ${type.color} ${
                propertyType === type.name ? 'ring-2 ring-offset-2 ring-blue-500' : ''
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
        {propertyType !== 'Others' && (
          <p className="mt-2 text-sm text-gray-600">Selected: {propertyType}, add size and other details in "Property Description" field below</p>
        )}
        
        {propertyType === 'Others'  && (
          <p className="mt-2 text-sm text-gray-600">Selected: {propertyType}, Add each and every details like size and others below in "Property Description" field below </p>
        )}
      </div>
        
      <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Property Description</label>
          <input
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add extra details for property type that you selected"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
          />
      </div>
                

      {/* BHK Input */}
      {/* <div className="flex flex-col mb-6">
        <label className="text-sm font-medium text-gray-700 mb-1">Total BHK*</label>
        <input
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 1 for 1BHK, 2 for 2BHK"
          value={totalBHK}
          onChange={(e) => setTotalBHK(e.target.value.replace(/[^0-9]/g, ''))}
          type="number"
          min="1"
        />
      </div> */}

      {/* Furniture Status */}
      {/* <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-3 block">Furniture Status*</label>
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
      </div> */}

      {/* Rent Amount */}
      {/* <div className="flex flex-col mb-6">
        <label className="text-sm font-medium text-gray-700 mb-1">Rent Amount / month (₹)*</label>
        <input
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter monthly rent amount"
          value={rentAmount}
          onChange={(e) => setRentAmount(e.target.value.replace(/[^0-9]/g, ''))}
          type="number"
          min="1"
        />
      </div> */}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
        >
          Back
        </button>
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

export default PropModalStep4;