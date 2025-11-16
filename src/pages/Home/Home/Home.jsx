import React from 'react';
import Banner from '../Banner/Banner';
import HowItWork from '../HowItWork/HowItWork';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto '>
          <Banner/>
          <HowItWork/>
        </div>
    );
};

export default Home;