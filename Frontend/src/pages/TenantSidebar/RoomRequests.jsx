import React, { useState, useEffect } from 'react';
import { api } from '../../Utils/AxiosHelper';

const RoomRequests = () => {

    const [request, setRequest] = useState([]); 

    // console.log(request);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const response = await api.get('/users/get-current-user');
                setRequest(response.data.data.incomingRequests);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRequest();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-xl font-semibold">Requests</h1>

            {request.length > 0 ? (
                request.map((req, index) => (
                    <div key={index} className="my-4 mx- border p-2 flex items-center justify-between">
                        <div>
                            <h1>Owner: <span>{req.ownerId?.fullName || 'N/A'}</span></h1>
                            <h1>Room: <span>{req.roomId?.roomNumber || 'N/A'}</span></h1>
                        </div>
                        <div className=''>
                            <button 
                                // onClick={()=>handleAccept()}
                                className='px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600'>Accept</button>
                            <button className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-3'>Reject</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No requests available</p>
            )}
        </div>
    );
};

export default RoomRequests;