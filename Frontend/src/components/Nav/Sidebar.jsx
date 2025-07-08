import { ChevronFirst, ChevronLast, MoreVertical, UserPen } from 'lucide-react';
import React, { createContext, useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SidebarContext = createContext()

const Sidebar = ({ children , to}) => {
    const navigate = useNavigate()
    
    const [expanded, setExpanded] = useState(false)
    return (
        <aside className='h-screen max-w-72 '>
            <nav className='h-screen inline-flex flex-col bg-white border-r shadow-sm'>
                <div className='mt-14 p-4 pb-2 flex justify-between items-center'>
                    {/* <h1 
                        className={`font-extrabold text-sky-800 text-2xl     overflow-hidden transition-all ${expanded ? 'w-32' : "w-0"}`}
                        >RentEase</h1> */}
                    <button onClick={()=> setExpanded((curr) => !curr) } className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100'>
                        {expanded ? <ChevronFirst /> : <ChevronLast />} 
                    </button>
                </div>

                <SidebarContext.Provider value={{expanded}}>
                    <ul className='flex-1 px-3 '>{children}</ul>
                </SidebarContext.Provider>

                <Link to={to}>
                    <div className='border-t flex p-3'>
                        <UserPen className=' flex-shrink-0 w-10 h-10 rounded-md p-2 bg-blue-400' />

                        <div
                        className={`flex justify-between items-center 
                        overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : "w-0 h-0"}`}>

                            <div className='leading-5'>
                                <h2 className=' text-black font-semibold'>Adarsh Raghuvanshi</h2>
                                <span className='text-gray-500'>aadi29@gmail.com</span>
                            </div>

                            <MoreVertical size={20} />
                        </div>
                    </div>
                </Link>
            </nav>
        </aside>
    );
};

const SidebarItem = ({ icon, text, active, alert, to }) => {
    const {expanded} = useContext(SidebarContext)
    const location = useLocation()
    const isActive = location.pathname === to
    return (
        <Link to={to}>
            <li className={`relative flex items-center py-2 px-3 gap-2 my-1 font-medium rounded-md cursor-pointer transition-colors group
                ${
                    isActive ? "bg-gradient-to-tr from-blue-100 to-blue-200 text-blue-800" : "hover:bg-blue-100 text-gray-600"
                }
            `}>

                {icon}

                <span 
                    className={`overflow-hidden transition-all 
                        ${expanded ? 'w-52 ml-3' : "w-0"}`} 
                >{text}</span>

                {alert && (
                    <div className={`absolute right-2 w-2 h-2 rounded bg-blue-400 
                        ${expanded ? "" : "top-2"}`}></div>
                )}

                {!expanded && (
                    <div
                        className={`
                        absolute left-full rounded-md px-2 py-1 ml-6
                        bg-indigo-100 text-indigo-800 text-sm
                        invisible opacity-20 -translate-x-3 transition-all
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                    `}
                    >
                    {text}
                    </div>
                )}
            </li>
        </Link>
    );
};

export { Sidebar, SidebarItem };
