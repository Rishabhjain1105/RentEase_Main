import { Search } from 'lucide-react'
import React , {useEffect, useState} from 'react'
import { api } from '../../../Utils/AxiosHelper'

const AssignTenantModal = ({roomId, Close}) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    // console.log(query)
    // console.log(results)


    useEffect(()=>{

        const searchId= async()=>{
            if(!query){
                setResults([])
                return;
            }
            try{
                const response = await api.get(`users/search?query=${query}`)
                // console.log("Response of searching: " ,response.data.data)
                setResults(response.data.data || [])

            } catch(error){
                console.error(error);
            }
        }

        searchId()
    },[query])

    const handelAddRequest = async (tenantId) => {
        // console.log(tenantId)
        // console.log(roomId)
        try{

            const response =  await api.post('/requests/send',{
                roomId,
                tenantId : tenantId
            })
            // console.log(response)
            if(response.data.success){
                alert("Request sent")
            } else{
                alert("Unable to send Request")
            }

        } catch(error){
            console.error(error)
        }

    }

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
                            value={query}
                            onChange={(e)=> setQuery(e.target.value)}
                        />
                        <button 
                            onClick={""}
                            className=' text-gray-700'>
                                <Search />
                        </button>

                    </div>
                </div>

            {results.length > 0 ? results.map((result) => (
                    
                    <div className='bg-blue-50 px-4 py-2 mx-8 my-2 rounded flex items-center justify-between' key={result.id} roomId={roomId}>

                        <div className='flex items-center gap-4'>
                            <div className='w-7 h-7 bg-black rounded-full'></div>
                            <h1 className='text-xl font-semibold'>{result.username}</h1>
                        </div>



                        <button 
                            onClick={()=>handelAddRequest(result._id)}
                            className='px-4 py-1 rounded text-white font-medium bg-blue-700 hover:bg-blue-600'>
                                Add
                        </button>

                    </div>
                )) : <p className='text-center mb-4 text-xs text-gray-700'>Search Results not found</p>
            }
  
            </div>
        </div>
    </>
  )
}

export default AssignTenantModal