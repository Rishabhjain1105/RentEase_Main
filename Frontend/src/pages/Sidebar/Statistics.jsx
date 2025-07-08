import React from 'react';

const Statistics = () => {
    return (
        <div className="max-w-full mx-auto py-8 px-4">
            <h1 className="font-bold text-3xl text-center mb-8 text-indigo-600">Statistics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-indigo-500">
                    <h2 className="text-xl font-semibold text-gray-700">Total Properties</h2>
                    <p className="text-4xl font-bold text-indigo-600 mt-4">10</p>
                </div>
                {/* Card 2 */}
                <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-green-500">
                    <h2 className="text-xl font-semibold text-gray-700">Active Users</h2>
                    <p className="text-4xl font-bold text-green-600 mt-4">45</p>
                </div>
                {/* Card 3 */}
                <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-yellow-500">
                    <h2 className="text-xl font-semibold text-gray-700">Rooms Booked</h2>
                    <p className="text-4xl font-bold text-yellow-600 mt-4">30</p>
                </div>
                {/* Card 4 */}
                <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-red-500">
                    <h2 className="text-xl font-semibold text-gray-700">Pending Requests</h2>
                    <p className="text-4xl font-bold text-red-600 mt-4">7</p>
                </div>
                {/* Card 5 */}
                <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-purple-500">
                    <h2 className="text-xl font-semibold text-gray-700">Revenue</h2>
                    <p className="text-4xl font-bold text-purple-600 mt-4">RS. 12,000</p>
                </div>
                {/* Card 6 */}
                <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-blue-500">
                    <h2 className="text-xl font-semibold text-gray-700">New Listings</h2>
                    <p className="text-4xl font-bold text-blue-600 mt-4">30</p>
                </div>
            </div>
        </div>
    );
};

export default Statistics;