import { Search } from 'lucide-react'
import React from 'react'

const AssignTenantModal = ({Close}) => {
  return (
    <>
        <div className='fixed inset-0  bg-gray-700 bg-opacity-50 z-50 h-screen w-screen  flex items-center justify-center '>
            <div className='bg-white  w-full max-w-xl'>
                {/* header */}
                <div className="flex justify-between items-center p-4 border-b ">
                    <h1 className="text-2xl font-bold text-gray-800">Search Tenant</h1>
                    <button
                        onClick={Close}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label="Close modal"
                        >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* input */}
                <div className='p-4'>
                    <div className='flex items-center py-2 justify-center border-b-2 border-gray-400'>

                        <input 
                            className='focus:outline-none w-full '
                            type='text' 
                            placeholder='Enter Username / Phone Number / Gmail'
                        />
                        <button 
                            onClick={""}
                            className=' text-gray-700'>
                                <Search />
                        </button>

                    </div>
                </div>

                <div className='bg-blue-50 px-4 py-2 mx-8 my-2 rounded flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <div className='w-7 h-7 bg-black rounded-full'></div>
                        <h1 className='text-xl font-semibold'>Ganpat</h1>
                    </div>
                    <button className='px-4 py-1 rounded text-white font-medium bg-blue-700 hover:bg-blue-600'>Add</button>
                </div>

            </div>
        </div>
    </>
  )
}

export default AssignTenantModal