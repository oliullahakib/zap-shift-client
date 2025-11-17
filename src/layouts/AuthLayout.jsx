import React from 'react';
import Logo from '../components/Logo/Logo';
import { Outlet } from 'react-router';
import authImage from "../assets/authImage.png"
const AuthLayout = () => {
    return (
        <div>
            <div className='flex flex-col-reverse lg:flex-row min-h-screen'>
            
                <div className='flex-1 bg-white'>
                    <div className='ml-8 mt-5'><Logo/></div>
                    <Outlet/>
                    </div>
                <div className='flex justify-center items-center flex-1 bg-[#FAFDF0]'>
                    <img src={authImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;