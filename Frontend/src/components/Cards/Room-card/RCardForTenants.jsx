import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import React, { useState } from 'react';
import TenantDetailsTable from '../../Tables/TenantDetailsTable';

const RCardForTenants = ({ 
  roomNumber,
  roomType,
  tenantType,
  floor,
  rentAmount,
  maxOccupancy,
  currentOccupants,
  isFurnitured,
  hasAttachedBath,
  roomImages,
  description,
  roomStatus,
  tenantDetails,
  messages,
  documents,
  bills, // Pass billing details as a prop
  onAddBill, // Function to handle adding a new bill
}) => {
 

  return (
    <>
    
        <div className={`w-full rounded-sm shadow-md `}>
            <div className='h-72 bg-gray-100 overflow-hidden'>
            {roomImages?.length > 0 ? (
                <img 
                    src={roomImages[0]} 
                    alt={roomNumber}
                    className="w-full h-full object-center"
                    onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-room.jpg';
                    }}
                />
                ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span>No Image Available</span>
                </div>
                )}
            </div>
            <div className="grid grid-cols-6 px-4 mt-4 text-center">
                <h1 className="text-gray-400 text-sm">Number</h1>
                <h1 className="text-gray-400 text-sm">Tenant Type</h1>
                <h1 className="text-gray-400 text-sm">Rent</h1>
                <h1 className="text-gray-400 text-sm">Max/Current</h1>
                <h1 className="text-gray-400 text-sm">Status</h1>
            </div>
            
            <div className="bg-white grid grid-cols-6 py-2 text-center">
                <h1 className='font-semibold text-2xl'>{roomNumber}</h1>
                <h1 className='font-normal'>{tenantType}</h1>
                <h1 className='font-normal'>Rs {rentAmount}</h1>
                <h1 className='font-normal'>{maxOccupancy} / {currentOccupants}</h1>
                <h1 className='font-normal'>{roomStatus}</h1>
            
            </div>
        
            <div className="bg-white px-10 ">
                <p className=' text-gray-700 tracking-widest mb-2   py-3'>
                    Room Type: {roomType} <br />
                    Floor: {floor} <br />
                    Bathroom: {hasAttachedBath} <br />
                    Furniture Status: {isFurnitured} 
                </p>
            </div>
            <div className="bg-white px-10 ">
                <h1>Description: </h1>
                <p className=' text-gray-700 tracking-widest mb-2 py-1 text-xs'>{description}</p>
            </div>
            
        </div>

    </>
  );
};

export default RCardForTenants;