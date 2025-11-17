import React from 'react';
import { Link, NavLink } from 'react-router';
import Mydiv from '../../components/Mydiv';
import Logo from '../../components/Logo/Logo';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user,logOutUser } = useAuth()
    const links = <>
        <li><NavLink to={'/services'} className={'text-accent'}>Services</NavLink></li>
        <li><NavLink to={'/converage'} className={'text-accent'}>Coverage</NavLink></li>
        <li><NavLink to={'/about-us'} className={'text-accent'}>About Us</NavLink></li>
        <li><NavLink to={'/pricing'} className={'text-accent'}>Pricing</NavLink></li>
        <li><NavLink to={'/blog'} className={'text-accent'}>Blog</NavLink></li>
        <li><NavLink to={'/contact'} className={'text-accent'}>Contact</NavLink></li>

    </>
    const hanldeLogout=()=>{
        logOutUser()
        .then(()=>{
            toast.success("Logout")
        })
    }
    return (
        <div className={'sticky top-0 z-10 glass-card w-2/3 mx-auto'}>
            <div className="navbar rounded-xl shadow-sm ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                            <Link to={'/login'} className="btn text-accent my-4">Sign In</Link>
                            <Link to={''} className="btn btn-primary text-black ">Be a rider</Link>
                        </ul>
                    </div>
                    <Logo />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">

                        {links}
                    </ul>
                </div>
                <div className="navbar-end ml-5 hidden lg:flex ">
                    {
                        user ? <button onClick={hanldeLogout} className='btn btn-warning'>Logout</button> : <>
                            <Link to={'/login'} className="btn text-accent mr-5">Sign In</Link>
                            <Link to={''} className="btn btn-primary text-black ">Be a rider</Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;