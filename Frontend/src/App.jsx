// import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import axios from 'axios';
import OwnerDashboard from './components/Dashboard/OwnerDashboard';

import RoomDashboard from './pages/RoomDashboard';
import TenantDashboard from './components/Dashboard/TenantDashboard';

import AuthPage from './pages/AuthPage';
import Profile from './pages/Sidebar/Profile';
import Settings from './pages/Sidebar/Settings';
import Statistics from './pages/Sidebar/Statistics';
import OwnerLayout from './Layouts/OwnerLayout';
import Billings from './pages/Sidebar/Billings';
import Help from './pages/Sidebar/Help';
import ViewProperty from './pages/ViewProperty';
import MainLayout from './Layouts/MainLayout';
import RoomView from './pages/RoomView';
import TenantLayout from './Layouts/TenantLayout';
import TenantProfile from './pages/TenantSidebar/TenantProfile';
import SearchProperties from './pages/TenantSidebar/SearchProperties';
import TenantStatistics from './pages/TenantSidebar/TenantStatistics';
import TenantBillings from './pages/TenantSidebar/TenantBillings';




const App = () => {
  
  return (
    
    <Routes>
      <Route path='/' element={<Navigate to = "/auth" />} />
      <Route path='/auth' element={<AuthPage />} />

      

      <Route element={<MainLayout />}>
        <Route path='/OwnerDashboard' element={< OwnerLayout />}>
          <Route index element={< OwnerDashboard />} />
          <Route path='Statistics' element={<Statistics />} />
          <Route path='Billings' element={<Billings />} />
          <Route path='Settings' element={<Settings />} />
          <Route path='Help' element={<Help />} />
          <Route path='profile' element={<Profile/>} />

          <Route path='property-details/:id' element={<ViewProperty />} />
          <Route path='rooms/:id' element={<RoomDashboard />} />
          <Route path='viewroom' element={<RoomView />} />
        </Route>

        <Route path='/TenantDashboard' element={< TenantLayout />}>
          <Route index element={< TenantDashboard />} />

          <Route path='Search' element={<SearchProperties />} />
          <Route path='Statistics' element={<TenantStatistics />} />
          <Route path='Billings' element={<TenantBillings />} />
          <Route path='Settings' element={<Settings />} />
          <Route path='Help' element={<Help />} />
          <Route path='profile' element={<TenantProfile/>} />

          
        </Route>
      </Route>
       
      <Route path='/TenantDashboard' element={<TenantDashboard/>} />

    </Routes>
  );
};

export default App;