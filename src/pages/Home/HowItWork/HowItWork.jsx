import React from 'react';
import Card from './Card';

const HowItWork = () => {
    const cards = [
        {
            id: 1,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvB6XyR4wRFaROsNdpmvieY9d9X8Ix-ygHUB81-L3QEyvXQZOcGUFpNnqowgECT7nszFA&usqp=CAU',
            title: 'Booking Pick & Drop',
            description: 'From personal packages to business shipments — we deliver on time, every time.'
        },
        {
            id: 2,
            img: 'https://img.freepik.com/premium-vector/cash-delivery_569841-175.jpg?semt=ais_hybrid&w=740&q=80',
            title: 'Cash On Delivery',
            description: 'From personal packages to business shipments — we deliver on time, every time.'
        },
        {
            id: 3,
            img: 'https://img.freepik.com/premium-vector/delivery-icon-vector-logo-design-with-creative-unique-concept-premium-vector_561067-1562.jpg?semt=ais_hybrid&w=740&q=80',
            title: 'Delivery Hub',
            description: 'From personal packages to business shipments — we deliver on time, every time.'
        },
        {
            id: 4,
            img: 'https://play-lh.googleusercontent.com/H6-VnBXONnaBe3wPGQgJ8ZdfXKoBBB0YJq_Q9H1ThJMqRdOvxr_uX9kkS-hIfxQGvew',
            title: 'Booking SME & Corporate',
            description: 'From personal packages to business shipments — we deliver on time, every time.'
        },
    ]
    return (
        <div className='lg:w-5xl  mx-auto mb-10 lg:min-h-80'>
            <h2 className='text-3xl font-extrabold text-secondary '>How It Works</h2>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-4 px-5 lg:px-0 mt-5'>
                {
                    cards.map(card => <Card key={card.id} card={card} />)
                }
            </div>
        </div>
    );
};

export default HowItWork;