import React, { useState, useEffect } from 'react';
import BCard from './BCard';
import PropertyModal from '../../Modals/PropertModal/PropertyModal.jsx';
import { api } from '../../../Utils/AxiosHelper.js';
// import LoadingSpinner from '../../Common/LoadingSpinner';  

const TenantCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get("/properties/fetch-properties");
        
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
  }, [refreshKey]);

  const handlePropertyAdded = () => {
    setIsModalOpen(false);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className=" md:px-4 md:py-8 min-h-screen bg-gray-50">
      {/* Header section */}
      <div className=" flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 ">My Room</h1>
        {/* <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-blue-700 hover:bg-blue-600 px-4 py-2 md:px-6 md:py-2 rounded-xl text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Property
        </button> */}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          {/* <LoadingSpinner /> */}
        </div>
      )}

      {/* Error state */}
      {error && !isLoading && (
        <div className="bg-blue-100 border border-vlue-400 text-vlue-700 px-4 py-3 rounded relative mb-6">
          {error}
          <button 
            // onClick={() => setRefreshKey(prev => prev + 1)}
            onClick={() => setIsModalOpen(true)}
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
          >
            Create?
          </button>
        </div>
      )}

      {/* Properties grid */}
      {!isLoading && !error && (
        <>
          {properties.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No properties found.</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-blue-700 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Your First Property
              </button>
            </div>
          ) : (
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <BCard
                  key={property._id || property.id}
                  id={property._id || property.id}
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
                  onDelete={() => setRefreshKey(prev => prev + 1)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Property Modal */}
      {isModalOpen && (
        <PropertyModal 
          Close={() => setIsModalOpen(false)}
          onSuccess={handlePropertyAdded}
        />
      )}
    </div>
  );
};

export default TenantCards;