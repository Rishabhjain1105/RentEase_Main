import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RCard from '../components/others/Room-card/RCard.jsx';
import AddRoomModal from '../components/Modals/RoomModal/RoomModal.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../Utils/AxiosHelper.js';

const RoomDashboard = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            setIsLoading(true);
            setError(null);
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
            } finally {
                setIsLoading(false);
            }
        };

        fetchRooms();
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="h-screen overflow-x-hidden max-w-full mx-auto py-8 px-4">
            <div className="bg-transparent mb-8 flex items-center justify-between w-full px-6">
                <h1 className="font-bold text-3xl font-sans">Rooms Dashboard</h1>
                <button 
                    onClick={() => setIsModelOpen(true)}
                    className="flex items-center bg-blue-700 hover:bg-blue-600 px-6 py-2 rounded-xl text-white transition-colors"
                >
                    Add new room
                </button>
            </div>

            {error && (
                <div className="text-red-500 text-center py-4">{error}</div>
            )}

            <div>
                {rooms.length > 0 ? (
                    <div className="grid grid-cols-6 px-4 mb-1 text-center">
                        <h1 className="text-gray-400 text-sm">Number</h1>
                        <h1 className="text-gray-400 text-sm">Tenant Type</h1>
                        <h1 className="text-gray-400 text-sm">Rent</h1>
                        <h1 className="text-gray-400 text-sm">Max/Current</h1>
                        <h1 className="text-gray-400 text-sm">Status</h1>
                    </div>
                ) : "" }
                {rooms.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No rooms found for this property.</p>
                    </div>
                ) : (
                    rooms.map(room => (
                        <RCard
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
                
                {isModelOpen && (
                    <AddRoomModal 
                        Close={() => setIsModelOpen(false)} 
                        propertyId={id}
                        onRoomAdded={(newRoom) => setRooms([...rooms, newRoom])}
                    />
                )}
            </div>
        </div>
    );
};

export default RoomDashboard;