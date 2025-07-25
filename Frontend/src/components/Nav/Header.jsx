import { MoreVertical } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md px-6 py-3 flex items-center justify-between ">
      {/* Logo */}
      <div className="font-extrabold text-sky-800 text-2xl tracking-wide">RentEase</div>

      {/* <div className='border-t flex p-3'>
          <UserPen className=' flex-shrink-0 w-10 h-10 rounded-md p-2 bg-blue-400' />
      </div> */}

      <div className="flex items-center gap-4">
        {/* <button className="text-gray-600 hover:text-blue-600 text-xl transition-all">
          <i className="fa-solid fa-bars"></i>
        </button> */}

          <img
            src="https://i.pravatar.cc/32"
            alt="profile"
            className="w-8 h-8 rounded-full border-2 border-blue-500 shadow-sm hover:scale-105 transition-transform"
            onClick={()=>navigate('/profile')}
          />
      </div>
    </header>
  );
};

export default Header;
