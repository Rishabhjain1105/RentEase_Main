import React, { useState } from 'react';
import AssignTenantModal from '../Modals/AssignTenantModal/AssignTenantModal';

const TenantDetailsTable = ({roomId, tenantDetails }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

//   console.log("tenantDetails ", tenantDetails)

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
                    {tenantDetails ? (
                            <tr className="hover:bg-gray-100">
                                <td className="py-3 px-4 text-center border-r-2">{tenantDetails.fullName}</td>
                                <td className="py-3 px-4 text-center border-r-2">{tenantDetails.email}</td>
                                <td className="py-3 px-4 text-center border-r-2">{tenantDetails.phoneNumber}</td>
                                <td className="py-3 px-4 text-center border-r-2">{tenantDetails.aadharCardNumber}</td>
                            </tr>
                        ) : (

                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    No tenant was added.
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            {isModalOpen && <AssignTenantModal roomId={roomId} Close={handleModalClose} />}
        </div>
    );
};

export default TenantDetailsTable;