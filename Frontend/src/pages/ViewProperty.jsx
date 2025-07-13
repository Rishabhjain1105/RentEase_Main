import React from 'react';
import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../Utils/AxiosHelper.js';
import RCardForTenants from '../components/Cards/Room-card/RCardForTenants.jsx';
import { Property } from '../../../Backend/src/models/property.model.js';

const ViewProperty = () => {
    const { id } = useParams();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await api.get(`/rooms/${id}`);
                if (response.status >= 200 && response.status < 300) {
                    const responseData = response.data?.data || response.data;
                    if (Array.isArray(responseData)) {
                        setRooms(responseData);
                    } else if (responseData && typeof responseData === 'object') {
                        const dataArray = Object.values(responseData);
                        setRooms(dataArray);
                    } else {
                        throw new Error("Response data is not in expected format");
                    }
                } else {
                    throw new Error(`Server returned status ${response.status}`);
                }
            } catch (error) {
                console.error(error);
                setRooms([]);
            } 
        };

        fetchRooms();
    }, [id]);

    

    const propertyTitle = rooms.length > 0 ? rooms[0]?.property_id?.title : "";
    const propertyCity = rooms.length > 0 ? rooms[0]?.property_id?.city : "";
    const propertyState = rooms.length > 0 ? rooms[0]?.property_id?.state : "";
    const amenities = rooms.length > 0 ? rooms[0]?.property_id?.amenities : "";
    const propertyIsAvailable = rooms.length > 0 ? rooms[0]?.property_id?.isAvailable : "";
    const propertyIsFullyRented = rooms.length > 0 ? rooms[0]?.property_id?.isFullyRentedF : "";

    const amenitiesArray = Array.isArray(amenities)
    ? (typeof amenities[0] === "string" && amenities[0].includes(",")
        ? amenities[0].split(',').map(a => a.trim())
        : amenities)
    : [];

    return (
        <>
            <div className=" overflow-x-hidden max-w-full mx-auto py-8 px-4 cursor-pointer">
                {rooms.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No rooms found for this property.</p>
                    </div>
                ) : (
                    <div className="bg-transparent mb-8 flex items-center justify-between w-full px-2">
                        <h1 className="font-bold text-3xl font-sans">{propertyTitle} - {propertyCity}, {propertyState}</h1>
                    </div>
                )}
                
            
            
                
                {amenitiesArray.length > 0 && (
                    <div className=" mx-2 border-t-2 border-b-2 py-6 ">
                        <h4 className="text-xl font-medium text-gray-700 mb-2">Amenities</h4>
                        <div className="flex flex-wrap gap-2 max-h-20  py-1">
                            {amenitiesArray.map((amenity, index) => (
                                <span
                                key={index}
                                className="px-6 py-6 text-xl font-semibold bg-red-100 text-black rounded-sm whitespace-nowrap"
                                title={amenity}
                                >
                                {amenity.length > 20 ? `${amenity.substring(0, 20)}...` : amenity}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <h4 className="text-xl font-medium text-gray-700 mt-6 mb-4 mx-2">Rooms</h4>
                <div className='grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 px-2 '>
                    {(
                        rooms.map(room => (
                            <RCardForTenants
                                key={room._id}
                                roomNumber={room.roomNumber}
                                roomType={room.roomType}
                                tenantType={room.tenantType}
                                floor={room.floor}
                                rentAmount={room.rentAmount}
                                maxOccupancy={room.maxOccupancy}
                                currentOccupants={room.currentOccupants}
                                isFurnitured={room.isFurnitured}
                                hasAttachedBath={room.hasAttachedBath}
                                roomImages={room.roomImages}
                                description={room.description}
                                roomStatus={room.roomStatus}
                                tenantDetails={room.tenantDetails} // Pass tenant details
                                messages={room.messages} // Pass tenant messages
                                documents={room.documents} // Pass uploaded documents

                                isAvailable = {propertyIsAvailable}
                                isFullyRented={propertyIsFullyRented}
                            />
                        ))
                    )}
                    
                
                </div>
            </div>
        
        </>
    );

};

export default ViewProperty;