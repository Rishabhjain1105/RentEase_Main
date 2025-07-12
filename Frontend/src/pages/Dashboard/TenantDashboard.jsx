import { LucideSearch } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const TenantDashboard = () => {
  // const [addedToAnyRoom, isAddedToAnyRoom] = ("")
  const navigate = useNavigate()
  return (
    <div className='p-6'>
          {/* <h1 className='font-bold text-2xl tracking-wide text-gray-700'>Dashboard</h1> */}
          <h1 className='text-center my-12 text-gray-600 font-semibold'>You are not added to any room yet</h1>

          <div className='flex justify-center items-center'>
            <div 
              onClick={() => navigate('/TenantDashboard/Search')}
              className=' inline-flex boder bg-blue-600 hover:bg-blue-700 p-4 text-white rounded-lg gap-2'>
              <LucideSearch/>
              <h1>Search Properties</h1>
            </div>
          </div>
    </div>
  )
}

export default TenantDashboard