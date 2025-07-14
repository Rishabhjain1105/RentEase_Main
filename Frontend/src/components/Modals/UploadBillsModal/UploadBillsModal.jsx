import React, { useState } from 'react';
import {api} from '../../../Utils/AxiosHelper.js'

const UploadBillsModal = ({ Close, propertyId, roomId, rentAmount }) => {
  const [bills, setBills] = useState([{ billType: 'Rent Bill', amount: rentAmount }]);
  const [billDate, setBillDate] = useState('');

  const billOptions = [
    'Rent Bill',
    'Electricity Bill',
    'Water Bill',
    'Gas Bill',
    'Maintenance Bill',
    'Internet and Cable Bill',
    'Security Bill',
    'Property Tax',
    'Parking Fee',
    'Other',
  ];

  const handleAddBill = () => {
    // setBills([...bills, {billType: 'Rent Bill', amount: rentAmount}])
    setBills([...bills, { billType: '', amount: '' }]);
  };

  const handleBillChange = (index, field, value) => {
    const updatedBills = [...bills];
    updatedBills[index][field] = value;
    setBills(updatedBills);
  };

  const handleRemoveBill = (index) => {
    const updatedBills = bills.filter((_, i) => i !== index);
    setBills(updatedBills);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({ billDate, bills });

    api.post(`/bills/add-bill`, {
      propertyId,
      roomId,
      billDate,
      bills,
    })
      .then((response) => {
        console.log('Bills uploaded successfully:', response.data);
        alert('Bill added successfully');
        Close(); // Close the modal after successful submission
      })
      .catch((error) => {
        console.error('Error uploading bills:', error);
        alert('Failed to upload bills. Please try again.');
      });

  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-x-hidden ">
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Add Bills</h1>
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

        <div className="p-6 space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Bill Date</label>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={billDate}
              onChange={(e) => setBillDate(e.target.value)}
            />
          </div>

          {bills.map((bill, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 items-center border-b pb-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Bill Type</label>
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={bill.billType}
                  onChange={(e) => handleBillChange(index, 'billType', e.target.value)}
                >
                  <option value="" disabled>Select Bill Type</option>
                  {billOptions.map((option, i) => (
                    <option key={i} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                  value={bill.amount}
                  onChange={(e) => handleBillChange(index, 'amount', e.target.value)}
                />
              </div>

              <button
                onClick={() => handleRemoveBill(index)}
                className="text-red-500 hover:text-red-700 focus:outline-none mt-6"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={handleAddBill}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Add New Bill
          </button>
        </div>

        <div className="p-4 flex justify-end border-t">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadBillsModal;