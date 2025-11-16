import React from 'react';

const Card = ({ card }) => {
    return (
        <div className="card  min-h-40 bg-base-100 card-xs shadow-sm">
            <img className='w-20 mx-auto rounded-full' src={card.img} alt="" />
            <div className="card-body">
                <h2 className="card-title">{card.title}</h2>
                <p>{card.description}</p>
                <div className="justify-end card-actions">
                    
                </div>
            </div>
        </div>
    );
};

export default Card;