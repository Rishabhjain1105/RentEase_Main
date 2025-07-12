import React from 'react';
import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../Utils/AxiosHelper.js';
import RCardForTenants from '../components/Cards/Room-card/RCardForTenants.jsx';

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

    

    return (
        <div className="h-screen overflow-x-hidden max-w-full mx-auto py-8 px-4">
            <div className="bg-transparent mb-8 flex items-center justify-between w-full px-6">
                <h1 className="font-bold text-3xl font-sans">Rooms</h1>
                
            </div>

           
            <div className='grid grid-cols-2 '>
                
                {rooms.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No rooms found for this property.</p>
                    </div>
                ) : (
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
                        />
                    ))
                )}
                
               
            </div>
        </div>
    );

};

export default ViewProperty;