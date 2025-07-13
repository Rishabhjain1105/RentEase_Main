import React from 'react';
import Header from '../components/Nav/Header';
import { Outlet } from 'react-router-dom';


const MainLayout = () => {
    return (
        <div className="h-screen flex flex-col cursor-pointer">
            <Header />
            <div className="overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;