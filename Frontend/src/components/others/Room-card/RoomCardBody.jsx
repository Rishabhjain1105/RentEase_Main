import React from 'react'

const RoomCardBody = ({name, contact, tStatus, bill}) => {

    const isEmpty = !name && !contact && !tStatus && !bill;

  return (
    <>
       <div className=' gap-5 px-5 mt-3'>

        {isEmpty ? (
            <div>
                <h1 className='text-[1rem] font-medium text-gray-600 mb-1'>Empty</h1>
            </div>
        ): (
            <>
            
            <div>
                <h1 className='text-[1.2rem] font-medium text-balance mb-1'>{name}</h1>
            </div>
            <div>
                <h1 className='text-[1rem] font-medium text-gray-600 mb-1'>Contact: {contact}</h1>
            </div>
            <div>
                <h1 className='text-[1rem] font-medium text-gray-600 mb-1'>Status: {tStatus}</h1>
            </div>
            <div>
                <h1 className='text-[1rem] font-medium text-gray-600 mb-1'>Bill: {bill}</h1>
            </div>

            </>
            
        )}
        </div>

    </>
   
  )
}

export default RoomCardBody

// text-[#E1E1E1] address