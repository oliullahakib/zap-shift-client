import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div>
            <h1 className='text-center text-4xl font-bold mt-6'>Your payment proccess failed</h1>
            <div className='flex justify-center items-center mt-5'>
                <Link className='btn btn-primary text-black' to={'/'}>Go Home</Link>
            </div>
        </div>
    );
};

export default PaymentCancel;