import React, { useMemo } from 'react';

const BillingDetailsTableForOwner = ({ bills }) => {
  // Extract unique bill types from all bills
  const uniqueBillTypes = useMemo(() => {
    const types = new Set();
    bills.forEach(billEntry => {
      if (billEntry.bills && Array.isArray(billEntry.bills)) {
        billEntry.bills.forEach(bill => {
          if (bill.billType) {
            types.add(bill.billType);
          }
        });
      }
    });
    return Array.from(types);
  }, [bills]);

  // Process bills data to format it for the table
  const processedBills = useMemo(() => {
    return bills.map(billEntry => {
      const row = {
        id: billEntry._id || billEntry.id,
        date: new Date(billEntry.billDate).toLocaleDateString(),
        status: billEntry.status || 'Unpaid',
        // Initialize each bill type with 0
        ...Object.fromEntries(uniqueBillTypes.map(type => [type, 0])),
      };

      // Fill in actual bill amounts
      if (billEntry.bills && Array.isArray(billEntry.bills)) {
        billEntry.bills.forEach(bill => {
          if (bill.billType && bill.amount) {
            row[bill.billType] = parseFloat(bill.amount);
          }
        });
      }

      // Calculate total
      row.total = uniqueBillTypes.reduce((sum, type) => sum + (row[type] || 0), 0);

      return row;
    });
  }, [bills, uniqueBillTypes]);

  if (!bills || bills.length === 0) {
    return <div className="text-gray-500 mt-4">No billing data available.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead className="bg-indigo-600 w-full text-white">
          <tr >
            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-white">Date</th>
            {uniqueBillTypes.map(type => (
              <th 
                key={type} 
                className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-white"
              >
                {type}
              </th>
            ))}
            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-white">Total</th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-white">Status</th>
          </tr>
        </thead>
        <tbody>
          {processedBills.map((row, index) => (
            <tr key={row.id || index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{row.date}</td>
              {uniqueBillTypes.map(type => (
                <td 
                  key={type} 
                  className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700"
                >
                  {row[type] ? `Rs ${row[type].toFixed(2)}` : '-'}
                </td>
              ))}
              <td className="py-2 px-4 border-b border-gray-200 text-sm font-medium text-gray-900">
                Rs {row.total.toFixed(2)}
              </td>
              <td className={`py-2 px-4 border-b border-gray-200 text-sm font-medium ${
                row.status.toLowerCase() === 'paid' ? 'text-green-600' : 'text-red-600'
              }`}>
                {row.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingDetailsTableForOwner;