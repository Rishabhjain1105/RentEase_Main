import { ArrowDownIcon, ArrowUpIcon, Coins } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import TenantDetailsTable from '../../Tables/TenantDetailsTable';
import BillingDetailsTableForOwner from '../../Tables/BillingDetailsTableForOwner.jsx';
import UploadBillsModal from '../../Modals/UploadBillsModal/UploadBillsModal';
import { api } from '../../../Utils/AxiosHelper.js';

const RCard = ({ 
  roomId,
  propertyId,
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
  onAddBill, // Function to handle adding a new bill
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Tenant Details');
  const [bills, setBills] = useState([]);
  
  const handleBillModalClose = () => {
    setIsBillModalOpen(false)
  }

  const handleAddBill = () => {
    setIsBillModalOpen(true)
  };

  useEffect(()=>{
    const fetchBills = async () =>{
        try{
              const response = await api.get(`/bills/fetch-bill/${propertyId}?roomId=${roomId}`)
              // console.log(response.data)
              if(response.data.statusCode >= 200){
                  setBills(response.data.data)
              }

          } catch(error){
              console.error(error)
              setBills([])
          }
      }

      fetchBills()
  }, [propertyId])

    // bills.map((bill)=>{
    //   console.log(bill.bills)
    // })

 
    // Update the renderTabContent function in RCard.jsx

const renderTabContent = () => {
  switch (activeTab) {
    case 'Tenant Details':
      return <TenantDetailsTable roomId={roomId} tenantDetails={tenantDetails} />;

    case 'Billing Details':
      return (
        <div className="mb-8 w-full">
          <button 
            className="bg-green-600 hover:bg-green-500 mb-4 text-white px-4 py-2 rounded-md"
            onClick={handleAddBill}
          >
            Upload Bill
          </button>

          <div className="overflow-x-auto">
            <BillingDetailsTableForOwner bills={bills} />
          </div>
        </div>
      );
    
    case 'Messages':
      return (
        <div>
          <button 
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md"
            //onClick={handleUploadDocument}
          >
            Send Message
          </button>
          <ul>
            {messages && messages.length > 0 ? (
              messages.map((msg, index) => (
                <li key={index} className="text-gray-700">{msg}</li>
              ))
            ) : (
              <li className="text-gray-500">No messages from tenant.</li>
            )}
          </ul>
        </div>
      );
    
    case 'Documents':
      return (
        <div>
          <button 
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md"
            //onClick={handleUploadDocument}
          >
            Upload Documents
          </button>
          <ul className="mt-4">
            {documents && documents.length > 0 ? (
              documents.map((doc, index) => (
                <li key={index} className="text-gray-700">
                  {doc.name} - <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No documents uploaded.</li>
            )}
          </ul>
        </div>
      );
    default:
      return null;
  }
};

  return (
    <div className="px-4 w-full mb-8">
      <div className={`w-full rounded-sm shadow-md transition-all duration-75 ${isExpanded ? 'rounded-b-none border-b-2 border-blue-500' : ''} hover:shadow-xl`}>
        <div className="bg-white grid grid-cols-6 py-4 text-center border-b-2 border-black">
          <h1 className='font-semibold text-2xl'>{roomNumber}</h1>
          <h1 className='font-normal'>{tenantType}</h1>
          <h1 className='font-normal'>Rs {rentAmount}</h1>
          <h1 className='font-normal'>{maxOccupancy} / {currentOccupants}</h1>
          <h1 className='font-normal'>{roomStatus}</h1>
          <div>
            <button onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </button>
          </div>
        </div>
        {isExpanded && (
          <div className="bg-white p-4">
            <p className='text-center text-gray-700 tracking-widest mb-12 py-3'>{roomType} Room at {floor} Floor, {isFurnitured} and Bathroom {hasAttachedBath} with Description as "{description}"</p>

            <div className=' bg-transparent mb-4 flex align-center justify-between max-w-full border-t-2 py-4  mx-6'>
              <h1 className='text-center text-2xl font-sans font-semibold text-gray-700'>Tenant Dashboard</h1>
            </div>

            <div className="grid grid-cols-4  max-w-full mx-4 mb-6 ">
              {['Tenant Details', 'Billing Details', 'Messages', 'Documents'].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-2 ${activeTab === tab ? ' text-black border-b  border-b-red-900' : 'text-gray-400'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-4 px-6">
              {renderTabContent()}
            </div>
          </div>
        )}
      </div>

      {isBillModalOpen && <UploadBillsModal propertyId={propertyId} roomId={roomId}  rentAmount={rentAmount} Close={handleBillModalClose}/>}

    </div>
  );
};

export default RCard;