import React from 'react'

const RoomCardHeader = ({roomNo}) => {
    return (
        <div className=' px-4 '>
            <h1 className='text-4xl font-bold text-black  -mx-4 -mt-5 pl-5 py-2 '>{roomNo}</h1>
        </div>
    )
}

export default RoomCardHeader