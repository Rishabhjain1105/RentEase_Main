import React from 'react'

// room 
    // room number
    // size
    // aminities
    // rate
    // for whom

// tenant
    // name
    // id
    // number of occupants
    // contact
    // email
    // join date
    // billing date
    // agreement tenure


const RoomView = () => {
  return (
    <div className='absolute top-0 left-0 z-50 flex justify-center backdrop-blur-sm items-center  h-screen w-full'>
        <div className='relative w-[90%] h-[70%] rounded-lg p-4 bg-[#011222] flex gap-2 flex-col'>
             <i className="absolute fa-solid fa-x  right-2 top-0 w-4 font-bold text-xl z-10 text-white"></i>

            <div className='bg-slate-50 w-full h-14 p-5 mt-3 flex justify-between items-center'>
                <h1>Room 1</h1>
                <h1>Size: 2BHK</h1>
                <h1>Amenities: </h1>
                <h1>Rate: 4000</h1>
                <h1>Eligibilty</h1>
            </div>
            <div className='bg-slate-50 h-full w-full p-5'>

                <h1>Tenant</h1>
                <div className='w-full bg-gray-100 mb-3 px-6 grid grid-cols-2 text-lg font-semibold'>
                    <h1>Name</h1>
                    <h1>Sharad Tiwari</h1>
                </div>
                <div className='w-full bg-gray-100 mb-3 px-6 grid grid-cols-2 text-lg font-semibold'>
                    <h1>ID</h1>
                    <h1>sharad_6 </h1>
                </div>
                
                <div className='w-full bg-gray-100 mb-3 px-6 grid grid-cols-2 text-lg font-semibold'>
                    <h1>Total Members </h1>
                    <h1>4</h1>
                </div>

                <div className='w-full bg-gray-100 mb-3 px-6 grid grid-cols-2 text-lg font-semibold'>
                    <h1>Contact Number</h1>
                    <h1>9826881580 </h1>
                </div>
                <div className='w-full bg-gray-100 mb-3 px-6 grid grid-cols-2 text-lg font-semibold'>
                    <h1>Email id </h1>
                    <h1>sharad6@mail.com</h1>
                </div>
                <div className='w-full bg-gray-100 mb-3 px-6 grid grid-cols-2 text-lg font-semibold'>
                    <h1>Join Date </h1>
                    <h1>1/2/20</h1>
                </div>
                <div className='w-full bg-gray-100 mb-3 px-6 grid grid-cols-2 text-lg font-semibold'>
                    <h1>Billing Date </h1>
                    <h1>15/2/20 </h1>
                </div>
                <div className='w-full bg-gray-100 mb-3 px-6 grid grid-cols-2 text-lg font-semibold'>
                    <h1>Agreement Tenure </h1>
                    <h1>1/2/20 to 1/2/21 </h1>
                </div>
                

            </div>
        </div>
    </div>
  )
}

export default RoomView