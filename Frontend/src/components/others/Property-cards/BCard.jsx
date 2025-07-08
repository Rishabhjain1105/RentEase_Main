import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Home, DollarSign, Box, Users } from 'lucide-react';

const BCard = ({
  id,
  title,
  description,
  street,
  city,
  state,
  pincode,
  landmark,
  propertyType,
  rentAmount,
  isAvailable,
  isFullyRented,
  amenities,
  isFurnitured,
  rentType,
  propertyImages
}) => {
  const navigate = useNavigate();

  const amenitiesArray = Array.isArray(amenities)
    ? (typeof amenities[0] === "string" && amenities[0].includes(",")
        ? amenities[0].split(',').map(a => a.trim())
        : amenities)
    : [];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col border border-gray-100 h-full cursor-pointer">

      {/* Property Image */}
      <div className="h-48 bg-gray-100 overflow-hidden">
        {propertyImages?.length > 0 ? (
          <img 
            src={propertyImages[0]} 
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-property.jpg';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>No Image Available</span>
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1" >
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2" title={description}>
          {description || 'No description provided'}
        </p>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-600">
              {[street, landmark, city, state, pincode].filter(Boolean).join(', ')}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <Home className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600 truncate" title={propertyType}>
                {propertyType || 'N/A'}
              </span>
            </div>
            {/* <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">
                {rentAmount ? `₹${rentAmount}/mo` : 'N/A'}
              </span>
            </div> */}
            {/* <div className="flex items-center">
              <Box className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">
                {isFurnitured ? 'Furnished' : 'Unfurnished'}
              </span>
            </div> */}
            {/* <div className="flex items-center">
              <Users className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600 capitalize">
                {rentType?.toLowerCase() || 'N/A'}
              </span>
            </div> */}
          </div>
        </div>

        {/* Amenities */}
        {amenitiesArray.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Amenities</h4>
            <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto py-1">
              {amenitiesArray.map((amenity, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full whitespace-nowrap"
                  title={amenity}
                >
                  {amenity.length > 15 ? `${amenity.substring(0, 15)}...` : amenity}
                </span>
              ))}
            </div>
          </div>
        )}


        {/* Status and Actions */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
          <div className="flex gap-2">
            <span className={`px-3 py-1 text-xs rounded-full ${
              isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isAvailable ? 'Available' : 'Not Available'}
            </span>
            {isFullyRented && (
              <span className="px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                Fully Rented
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            {/* <button 
              onClick={() => navigate(`/OwnerDashboard/property-details/${id}`)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              View
            </button> */}
            <button 
              onClick={() => navigate(`/OwnerDashboard/rooms/${id}`)}
              className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BCard;