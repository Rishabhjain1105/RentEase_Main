import { Outlet, useLocation } from 'react-router-dom';
import React, { useState } from 'react'
import {Sidebar , SidebarItem} from '../components/Nav/Sidebar'
import { BarChart2, BarChart3, LayoutDashboard, LifeBuoy, Receipt, ReceiptIndianRupee, Search, Settings, Settings2 } from 'lucide-react'

const TenantLayout = () => {
    
    return (
        <div className=' h-screen flex  '>
            
          <Sidebar to = "/TenantDashboard/Profile">
            <SidebarItem 
              icon={ <LayoutDashboard size={20} /> }
              text={"Dashboard"}  
              to = "/TenantDashboard"
            />

            <SidebarItem 
              icon={ <Search size={20} /> }
              text={"Search"}  
              to = "/TenantDashboard/Search"
            />

            <SidebarItem 
              icon={ <BarChart3 size={20} /> }
              text={"Statistics"}  
              to = "/TenantDashboard/Statistics"
            />

            <SidebarItem 
              icon={ <ReceiptIndianRupee size={20} /> }
              text={"Billings"}  
              // alert
              to = "/TenantDashboard/Billings"
            />

            <SidebarItem 
              icon={ <Settings size={20} /> }
              text={"Settings"}  
              // alert
              to = "/TenantDashboard/Settings"
            />

            <SidebarItem 
                icon={ <LifeBuoy size={20} /> }
                text={"Help"}  
                to = "/TenantDashboard/Help"
            />

          </Sidebar>
          
          <div className='flex-1 overflow-y-auto mt-12'>
            <Outlet />
          </div>
        
        </div>
    );
};

export default TenantLayout;
