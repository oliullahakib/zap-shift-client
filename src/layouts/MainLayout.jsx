import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/Shared/Navbar';
import Footer from '../pages/Shared/Footer';

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
           <div className='flex-1'> <Outlet /></div>
            <Footer/>
        </div>
    );
};

export default MainLayout;