import React from 'react';

const TenantBillings = () => {
    return (
        <div className="max-w-full mx-auto py-8 px-4">
            <h1 className="font-bold text-3xl text-center mb-8 text-indigo-600">Billings History</h1>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Room Number</th>
                            <th className="py-3 px-6 text-left">Billing Month</th>
                            <th className="py-3 px-6 text-left">Room Rent</th>
                            <th className="py-3 px-6 text-left">Electricity Bill</th>
                            <th className="py-3 px-6 text-left">Water Bill</th>
                            <th className="py-3 px-6 text-left">Amenities</th>
                            <th className="py-3 px-6 text-left">Net Payable</th>
                            <th className="py-3 px-6 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Example Row 1 */}
                        <tr className="border-b hover:bg-gray-100">
                            <td className="py-3 px-6">101</td>
                            <td className="py-3 px-6">April 2025</td>
                            <td className="py-3 px-6">₹12,000</td>
                            <td className="py-3 px-6">₹2,000</td>
                            <td className="py-3 px-6">₹1,000</td>
                            <td className="py-3 px-6">₹500</td>
                            <td className="py-3 px-6">₹15,500</td>
                            <td className="py-3 px-6 text-green-600 font-semibold">Paid</td>
                        </tr>
                        {/* Example Row 2 */}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TenantBillings;