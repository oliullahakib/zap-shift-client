import React from 'react';
import forbiddenAnimation from "../../assets/animation/forbidden.json"
import Lottie from 'lottie-react';
import { Link } from 'react-router';
const Forbidden = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <Lottie
            animationData={forbiddenAnimation}
            />
            <h1 className='text-5xl font-bold mt-5 text-pink-400'>Forbidden Access</h1>

            <div className='flex gap-3 mt-3'>
                <Link to={'/'} className='btn btn-primary text-black'>Go to Home</Link>
            <Link to={'/dashboard'} className='btn btn-info text-black'>Go to Dashboard</Link>
            </div>
        </div>
    );
};

export default Forbidden;