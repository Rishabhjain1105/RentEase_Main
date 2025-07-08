import React from 'react';

const TenantDetailsTable = () => {
    return (
        <div className="mb-12 ">
            <h2 className="font-bold text-xl text-gray-800 mb-4 mx-6">Tenant Details</h2>

            <table className='bg-white min-w-full shadow-md '>
                <thead className='bg-indigo-600 w-full text-white'>
                    <tr>
                        <th className='py-3 px-4 text-center border-r-2'>Name</th>
                        <th className='py-3 px-4 text-center border-r-2'>Email</th>
                        <th className='py-3 px-4 text-center border-r-2'>Phone</th>
                        <th className='py-3 px-4 text-center border-r-2'>Aadhaar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='hover:bg-gray-100'>
                        <td className='py-3 px-4 text-center border-r-2 '>Rishabh Saxena</td>
                        <td className='py-3 px-4 text-center border-r-2'>rishabh07@gmail.com</td>
                        <td className='py-3 px-4 text-center border-r-2'>9876543210</td>
                        <td className='py-3 px-4 text-center border-r-2'>978756984519</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TenantDetailsTable;