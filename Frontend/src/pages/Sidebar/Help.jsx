import React from 'react';

const Help = () => {
    return (
        <div className="max-w-full mx-auto py-8 px-4">
            <h1 className="font-bold text-3xl text-center mb-8 text-indigo-600">Help & Guide</h1>
            
            {/* Section: Adding a Property */}
            <div className="mb-8">
                <h2 className="font-semibold text-2xl text-gray-800 mb-4">How to Add a Property</h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Go to the <strong>Properties Dashboard</strong>.</li>
                    <li>Click on the <strong>"Add New Property"</strong> button.</li>
                    <li>Fill in the required details such as <strong>Title, Description, Address, Amenities</strong>, and <strong>Property Type</strong>.</li>
                    <li>Upload images of the property.</li>
                    <li>Click <strong>Submit</strong> to save the property.</li>
                </ol>
            </div>

            {/* Section: Adding Rooms */}
            <div className="mb-8">
                <h2 className="font-semibold text-2xl text-gray-800 mb-4">How to Add Rooms</h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Navigate to the <strong>Rooms Dashboard</strong> for a specific property.</li>
                    <li>Click on the <strong>"Add New Room"</strong> button.</li>
                    <li>Provide details such as <strong>Room Number, Type, Rent Amount, Floor</strong>, and <strong>Occupancy</strong>.</li>
                    <li>Upload images of the room.</li>
                    <li>Click <strong>Submit</strong> to add the room.</li>
                </ol>
            </div>

            {/* Section: Managing Tenants */}
            <div className="mb-8">
                <h2 className="font-semibold text-2xl text-gray-800 mb-4">How to Manage Tenants</h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Go to the <strong>Tenant Dashboard</strong> for a specific room.</li>
                    <li>Click on <strong>"Assign Tenant"</strong> to add a new tenant.</li>
                    <li>Provide tenant details such as <strong>Name, Contact Information, and Agreement Details</strong>.</li>
                    <li>To remove a tenant, click on <strong>"Remove Tenant"</strong> and confirm the action.</li>
                    <li>Use the <strong>Edit</strong> option to update tenant details if needed.</li>
                </ol>
            </div>

            {/* Section: Additional Help */}
            <div>
                <h2 className="font-semibold text-2xl text-gray-800 mb-4">Need More Help?</h2>
                <p className="text-gray-700">
                    If you have any questions or face issues, please contact our support team at <strong>support@rentease.com</strong>.
                </p>
            </div>
        </div>
    );
};

export default Help;