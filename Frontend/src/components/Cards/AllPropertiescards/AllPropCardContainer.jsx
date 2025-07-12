import React, { useState, useEffect } from 'react';
import { api } from '../../../Utils/AxiosHelper.js';
import PostPropertyCard from './PostPropertyCard.jsx';

const AllPropCardContainer = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get("/properties/fetch-all-properties");
        
        // Check for successful response and data format
        if (response.status >= 200 && response.status < 300) {
          // Handle different possible response formats
          const responseData = response.data?.data || response.data;
          
          if (Array.isArray(responseData)) {
            setProperties(responseData);
          } else if (responseData && typeof responseData === 'object') {
            // If the response is an object, try to extract an array
            const dataArray = Object.values(responseData);
            if (Array.isArray(dataArray)) {
              setProperties(dataArray);
            } else {
              throw new Error("Response data is not in expected format");
            }
          } else {
            throw new Error("No valid properties data received");
          }
        } else {
          throw new Error(`Server returned status ${response.status}`);
        }
      } catch (error) {
        setError("No Properties added!! Please create a new property");
        setProperties([]); // Reset properties to empty array
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);


  return (
    <div className=" md:px-4 md:py-8 lg:px-8 min-h-screen bg-gray-50">     


      {/* Properties grid */}
        {properties.length === 0 ? (
            
            <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No properties added by anyone</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {properties.map((property) => (
              <PostPropertyCard
                key={property._id || property.id}
                id={property._id || property.id}
                owner={property.owner.username}
                title={property.title}
                description={property.description}
                street={property.street}
                city={property.city}
                state={property.state}
                pincode={property.pincode}
                landmark={property.landmark}
                propertyType={property.propertyType}
                rentAmount={property.rentAmount}
                isAvailable={property.isAvailable}
                isFullyRented={property.isFullyRented}
                amenities={property.amenities}
                isFurnitured={property.isFurnitured}
                rentType={property.rentType}
                propertyImages={property.propertyImages}
                />
            ))}
            </div>
        )}
    </div>
  );
};

export default AllPropCardContainer;