import React from 'react'

const TrialModal = ({Close}) => {
  return (
    <>
        <div className='fixed inset-0  bg-gray-700 bg-opacity-50 z-50 h-screen w-screen  flex items-center justify-center '>
            <div className='bg-white p-10  '>
                <h1>Hello</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, delectus?</p>
                <button 
                    onClick={Close}
                    className='bg-red-500 px-4 py-1 rounded-xl text-white mt-6'>
                        Exit
                </button>
            </div>
        </div>
    </>
  )
}

export default TrialModal