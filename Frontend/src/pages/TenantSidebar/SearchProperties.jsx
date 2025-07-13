import React from 'react';
import { Search } from 'lucide-react';
import AllPropCardContainer from '../../components/Cards/AllPropertiescards/AllPropCardContainer';

const SearchProperties = () => {
    return (
        <>
            <div className="flex mx-8 my-12 gap-2">
                <div className="flex items-center w-full   bg-gray-100 rounded-lg shadow-md px-2 py-4">
                    <Search className="text-gray-500 w-5 h-5 mr-2" />
                    <input
                        type="text"
                        placeholder="Search properties..."
                        className="flex-grow bg-transparent outline-none text-gray-700 text-xl"
                    />
                </div>
                <button className='px-6 py-4 rounded-lg shadow-md text-white text-xl bg-blue-600 hover:bg-blue-700 '>Search</button>

                {/* <h1 className="mt-4 text-2xl font-bold">Search Properties</h1> */}
            </div>

            <AllPropCardContainer />
        </>
    );
};

export default SearchProperties;