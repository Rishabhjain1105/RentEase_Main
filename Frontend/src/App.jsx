// import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import OwnerDashboard from './pages/Dashboard/OwnerDashboard';

import RoomDashboard from './pages/Dashboard/RoomDashboard';
import TenantDashboard from './pages/Dashboard/TenantDashboard';

import LandingPage from './pages/Dashboard/LandingPage'
import AuthPage from './pages/AuthPage';
import Profile from './pages/Sidebar/Profile';
import Settings from './pages/Sidebar/Settings';
import Statistics from './pages/Sidebar/Statistics';
import OwnerLayout from './Layouts/OwnerLayout';
import Billings from './pages/Sidebar/Billings';
import Help from './pages/Sidebar/Help';
import MainLayout from './Layouts/MainLayout';
import TenantLayout from './Layouts/TenantLayout';
import TenantProfile from './pages/TenantSidebar/TenantProfile';
import SearchProperties from './pages/TenantSidebar/SearchProperties';
import TenantStatistics from './pages/TenantSidebar/TenantStatistics';
import TenantBillings from './pages/TenantSidebar/TenantBillings';
import ViewProperty from './pages/ViewProperty';
import { UserContext } from './Context/UserContext';

import React, {useContext, useEffect} from 'react';
import Messages from './pages/TenantSidebar/Messages';


const App = () => {
  
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to login
    }
  }, [user]);

  return (
    
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/TenantDashboard/Search/:id' element={<ViewProperty />} />

      <Route element={<MainLayout />}>
        <Route path='/profile' element={<Profile/>} />
        <Route path='/OwnerDashboard' element={< OwnerLayout />}>
          <Route index element={< OwnerDashboard />} />
          <Route path='Statistics' element={<Statistics />} />
          <Route path='Billings' element={<Billings />} />
          <Route path='Settings' element={<Settings />} />
          <Route path='Help' element={<Help />} />
          {/* <Route path='profile' element={<Profile/>} /> */}

          <Route path='rooms/:id' element={<RoomDashboard />} />
        </Route>

        <Route path='/TenantDashboard' element={< TenantLayout />}>
          <Route index element={< TenantDashboard />} />

          <Route path='Search' element={<SearchProperties />} />
          <Route path='Statistics' element={<TenantStatistics />} />
          <Route path='Billings' element={<TenantBillings />} />
          <Route path='Settings' element={<Settings />} />
          <Route path='Help' element={<Help />} />
          <Route path='Messages' element={<Messages/>} />

          
          <Route path='/TenantDashboard/Search/:id' element={<ViewProperty />} />


          
        </Route>
      </Route>
       

    </Routes>
  );
};

export default App;