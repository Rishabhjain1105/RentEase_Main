import { Outlet, useLocation } from 'react-router-dom';
import React, { useState } from 'react'
import {Sidebar , SidebarItem} from '../components/Nav/Sidebar'
import { BarChart2, BarChart3, LayoutDashboard, LifeBuoy, Receipt, ReceiptIndianRupee, Settings, Settings2 } from 'lucide-react'

const OwnerLayout = () => {
    
    return (
        <div className=' h-screen flex  '>
            
          <Sidebar to = "/OwnerDashboard/Profile">
            <SidebarItem 
              icon={ <LayoutDashboard size={20} /> }
              text={"Dashboard"}  
              to = "/OwnerDashboard"
            />

            <SidebarItem 
              icon={ <BarChart3 size={20} /> }
              text={"Statistics"}  
              to = "/OwnerDashboard/Statistics"
            />

            <SidebarItem 
              icon={ <ReceiptIndianRupee size={20} /> }
              text={"Billings"}  
              // alert
              to = "/OwnerDashboard/Billings"
            />

            <SidebarItem 
              icon={ <Settings size={20} /> }
              text={"Settings"}  
              // alert
              to = "/OwnerDashboard/Settings"
            />

            <SidebarItem 
                icon={ <LifeBuoy size={20} /> }
                text={"Help"}  
                to = "/OwnerDashboard/Help"
            />

          </Sidebar>
          
          <div className='flex-1 overflow-y-auto mt-12'>
            <Outlet />
          </div>
        
        </div>
    );
};

export default OwnerLayout;
