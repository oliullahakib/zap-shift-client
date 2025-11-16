import React from 'react';
import reviewQut from "../../../assets/reviewQuote.png"
const ReviewCard = ({review}) => {
    const {user_photoURL,review:testomony,userName}=review
    return (
        <div  className='bg-base-100 p-5 rounded-xl'>
            <div className='border-b border-dashed border-secondary pb-3'>
                <img className='w-20' src={reviewQut} alt="" />
                <p>{testomony} </p>
            </div>
            <div className='flex flex-col gap-3 mt-5'>
                <img className='w-12 h-12 rounded-full' src={user_photoURL} alt="" />
                <div>
                    <h3>{userName}</h3>
                    <p>Senior Product Designer</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;