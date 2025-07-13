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

  isAvailable,
  isFullyRented
}) => {
 

  return (
    <>
        
        <div className={`w-full rounded-sm shadow-md  bg-gray-50 cursor-pointer`}>

            <div className='bg-white border  flex items-center justify-between py-3 px-4 '>
                <div className='flex items-center justify-center'>
                    <div className=''>RN-</div>
                    <div className='h-full font-semibold'>{roomNumber}</div>
                </div>
                
            </div>

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
        
            <div className="bg-white px-10 mt-6 mx-2 rounded-sm">
                <h1>Description: </h1>
                <p className=' text-gray-700 tracking-widest mb-2 py-1 text-xs'>{description}</p>
            </div>

            <div className='grid grid-cols-2  mx-2 rounded-sm'>

                <div className="bg-white px-10 ">
                    <p className=' text-gray-700 tracking-widest mb-2   py-3'>
                        Room Number: {roomNumber} <br />
                        Tenant Type: {tenantType} <br />
                        Max Occupants: {maxOccupancy} <br />
                        Current Occupants: {currentOccupants} 
                    </p>
                </div>
                <div className="bg-white px-10 ">
                    <p className=' text-gray-700 tracking-widest mb-2   py-3'>
                        Room Type: {roomType} <br />
                        Floor: {floor} <br />
                        Bathroom: {hasAttachedBath} <br />
                        Furniture Status: {isFurnitured} 
                    </p>
                </div>
            </div>

             
            <div className='flex items-center justify-between px-10 py-6'>

                <div className="flex gap-2 ">
                    <span className={`px-2 py-1 text-base rounded-full ${
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

                <div className='flex items-center justify-center bg-green-100 text-green-800 px-2 py-1 rounded-sm shadow-sm '>
                    Rs. <span className='font-semibold pl-1 text-lg'>{rentAmount}</span>/Month
                </div>

            </div>

            <div className='text-end px-10 py-2 mb-2 '>

                <button className=' bg-blue-600 text-white hover:bg-blue-700 px-2 py-1 rounded-lg shadow-sm'>
                    Send Message
                </button>
                <button className='ml-2 bg-blue-600 text-white hover:bg-blue-700 px-2 py-1 rounded-lg shadow-sm'>
                    Get Phone Number
                </button>
                
                

            </div>
            
        </div>

    </>
  );
};

export default RCardForTenants;