import { BadgeIndianRupee, DatabaseZapIcon, GitPullRequestArrow, HeartPulseIcon, History, IndianRupeeIcon, LucideSearch } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const TenantDashboard = () => {
  // const [addedToAnyRoom, isAddedToAnyRoom] = ("")
  const navigate = useNavigate()
  return (
    <div className='p-6'>
          {/* <h1 className='font-bold text-2xl tracking-wide text-gray-700'>Dashboard</h1> */}
          <h1 className='text-center my-12 text-gray-600 font-semibold'>You are not added to any room yet</h1>

          <div className='flex gap-2 '>

            <div 
              onClick={() => navigate('/TenantDashboard')}
              className='flex items-center px-2 border bg-blue-600 hover:bg-blue-700 text-white font-medium h-16 rounded-lg gap-2'>
              <BadgeIndianRupee />
              <h1>Pay Bill</h1>
            </div>

            <div 
              onClick={() => navigate('/TenantDashboard/Billings')}
              className='flex items-center px-2 border bg-blue-600 hover:bg-blue-700 text-white font-medium h-16 rounded-lg gap-2'>
              <History/>
              <h1>Billing History</h1>
            </div>

            <div 
              onClick={() => navigate('/TenantDashboard/Room-Requests')}
              className='flex items-center px-2 border bg-blue-600 hover:bg-blue-700 text-white font-medium h-16 rounded-lg gap-2'>
              <GitPullRequestArrow/>
              <h1>Room Request</h1>
            </div>

            <div 
              onClick={() => navigate('/TenantDashboard/Messages')}
              className='flex items-center px-2 border bg-blue-600 hover:bg-blue-700 text-white font-medium h-16 rounded-lg gap-2'>
              <HeartPulseIcon/>
              <h1>Maintenance Request</h1>
            </div>

            <div 
              onClick={() => navigate('/TenantDashboard/Messages')}
              className='flex items-center px-2 border bg-blue-600 hover:bg-blue-700 text-white font-medium h-16 rounded-lg gap-2'>
              <DatabaseZapIcon/>
              <h1>Owner Details Request</h1>
            </div>

         

            <div 
              onClick={() => navigate('/TenantDashboard/Search')}
              className='flex items-center px-2 border bg-blue-600 hover:bg-blue-700 text-white font-medium h-16 rounded-lg gap-2'>
              <LucideSearch/>
              <h1>Search Properties</h1>
            </div>

          </div>
    </div>
  )
}

export default TenantDashboard