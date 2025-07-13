import React, { useState } from 'react';
import AssignTenantModal from '../Modals/AssignTenantModal/AssignTenantModal';

const TenantDetailsTable = ({ tenantDetails }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="mb-12">
            <button
                className="bg-green-600 hover:bg-green-500 mb-2 text-white px-4 py-2 rounded-md"
                onClick={() => setIsModalOpen(true)}
            >
                Assign Tenant
            </button>
            <table className="bg-white min-w-full shadow-md">
                <thead className="bg-indigo-600 w-full text-white">
                    <tr>
                        <th className="py-3 px-4 text-center border-r-2">Name</th>
                        <th className="py-3 px-4 text-center border-r-2">Email</th>
                        <th className="py-3 px-4 text-center border-r-2">Phone</th>
                        <th className="py-3 px-4 text-center border-r-2">Aadhaar</th>
                    </tr>
                </thead>
                <tbody>
                    {tenantDetails && tenantDetails.length > 0 ? (
                        tenantDetails.map((detail, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-3 px-4 text-center border-r-2">{detail.name}</td>
                                <td className="py-3 px-4 text-center border-r-2">{detail.gmail}</td>
                                <td className="py-3 px-4 text-center border-r-2">{detail.number}</td>
                                <td className="py-3 px-4 text-center border-r-2">{detail.aadhaar}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-gray-500">
                                No tenant was added.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {isModalOpen && <AssignTenantModal Close={handleModalClose} />}
        </div>
    );
};

export default TenantDetailsTable;