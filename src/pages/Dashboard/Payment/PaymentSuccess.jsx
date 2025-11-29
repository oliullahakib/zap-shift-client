import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({})
    const axiosSecure=useAxiosSecure()
    const sesson_id=searchParams.get("session_id")
    useEffect(() => {
     axiosSecure.patch(`/payment-success?session_id=${sesson_id}`)
     .then(res=>{
        console.log(res?.data)
        setPaymentInfo({
            transactionId:res.data.transactionId,
            trakingId:res.data.trakingId
        })
    })
     .catch(err => console.log(err))

    }, [axiosSecure,sesson_id])
    return (
        <div>
             <h1 className='text-center text-4xl font-bold mt-6'>Your Payment is Successful</h1>
             <h2 className='text-center'><span className='font-bold'>Transaction ID:</span>{paymentInfo.transactionId}</h2>
             <h2 className='text-center'><span className='font-bold'>Traking ID:</span>{paymentInfo.trakingId}</h2>
        </div>
    );
};

export default PaymentSuccess;