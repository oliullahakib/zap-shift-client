import React from 'react';
import Banner from '../Banner/Banner';
import HowItWork from '../HowItWork/HowItWork';
import Brands from '../Brands/Brands';
import Review from '../Review/Review';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto '>
          <Banner/>
          <HowItWork/>
          <Brands/>
          <Review/>
        </div>
    );
};

export default Home;