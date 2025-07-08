import React from 'react';

const Billings = () => {
    return (
        <div className="max-w-full mx-auto py-8 px-4">
            <h1 className="font-bold text-3xl text-center mb-8 text-indigo-600">Billings</h1>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Property Name</th>
                            <th className="py-3 px-6 text-left">Room Number</th>
                            <th className="py-3 px-6 text-left">Tenant Name</th>
                            <th className="py-3 px-6 text-left">Billing Month</th>
                            <th className="py-3 px-6 text-left">Amount</th>
                            <th className="py-3 px-6 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Example Row 1 */}
                        <tr className="border-b hover:bg-gray-100">
                            <td className="py-3 px-6">Sunrise Apartments</td>
                            <td className="py-3 px-6">101</td>
                            <td className="py-3 px-6">John Doe</td>
                            <td className="py-3 px-6">April 2025</td>
                            <td className="py-3 px-6">₹12,000</td>
                            <td className="py-3 px-6 text-green-600 font-semibold">Paid</td>
                        </tr>
                        {/* Example Row 2 */}
                        <tr className="border-b hover:bg-gray-100">
                            <td className="py-3 px-6">Green Valley</td>
                            <td className="py-3 px-6">202</td>
                            <td className="py-3 px-6">Jane Smith</td>
                            <td className="py-3 px-6">April 2025</td>
                            <td className="py-3 px-6">₹15,000</td>
                            <td className="py-3 px-6 text-red-600 font-semibold">Pending</td>
                        </tr>
                        {/* Example Row 3 */}
                        <tr className="border-b hover:bg-gray-100">
                            <td className="py-3 px-6">Ocean View</td>
                            <td className="py-3 px-6">303</td>
                            <td className="py-3 px-6">Alice Johnson</td>
                            <td className="py-3 px-6">April 2025</td>
                            <td className="py-3 px-6">₹10,000</td>
                            <td className="py-3 px-6 text-green-600 font-semibold">Paid</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Billings;