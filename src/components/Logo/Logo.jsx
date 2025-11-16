import React from 'react';
import logo from '../../assets/logo.png'
const Logo = () => {
    return (
        <div className='flex items-end'>
            <img className='w-10' src={logo} alt="logo" />
            <h2 className='text-3xl font-extrabold -ml-3'>ZapShift</h2>
        </div>
    );
};

export default Logo;