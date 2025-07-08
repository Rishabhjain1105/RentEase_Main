import React from 'react';
import { MoveLeft, MoveRight } from 'lucide-react'
const BacKNextButtons = () => {
    return (
        <div className='flex justify-between '>
        
        <div className='flex gap-2 border px-4 py-1 text-gray-900 border-black rounded hover:border-red-600 '>
          <MoveLeft className='w-4'/>
          <button>Back</button>
        </div>

        <div className='flex gap-2 border px-4 py-1 text-gray-900 border-black rounded hover:border-red-600 '>
          <button>Next</button>
          <MoveRight className='w-4'/>
        </div>
        
      </div>
    );
};

export default BacKNextButtons;