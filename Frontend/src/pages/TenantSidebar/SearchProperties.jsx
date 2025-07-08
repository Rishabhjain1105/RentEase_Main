import React from 'react';
import { Search } from 'lucide-react';

const SearchProperties = () => {
    return (
        <div className="p-4 mt-5 mx-5">
            <div className="flex items-center bg-gray-100 rounded-lg shadow-md p-2">
                <Search className="text-gray-500 w-5 h-5 mr-2" />
                <input
                    type="text"
                    placeholder="Search properties..."
                    className="flex-grow bg-transparent outline-none text-gray-700"
                />
                <button className='bg-blue-500 px-2 rounded text-white hover:bg-blue-700 '>Search</button>
            </div>
            {/* <h1 className="mt-4 text-2xl font-bold">Search Properties</h1> */}
        </div>
    );
};

export default SearchProperties;