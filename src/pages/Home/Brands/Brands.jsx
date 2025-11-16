import React from 'react';
import Marquee from 'react-fast-marquee';
import amazonLogo from "../../../assets/brands/amazon.png"
import amazon_vectorLogo from "../../../assets/brands/amazon_vector.png"
import casiaLogo from "../../../assets/brands/moonstar.png"
import randstadLogo from "../../../assets/brands/randstad.png"
import starLogo from "../../../assets/brands/star.png"
import startPeopleLogo from "../../../assets/brands/start_people.png"
import Mydiv from '../../../components/Mydiv';
const Brands = () => {
    const brandLogos=[amazonLogo,amazon_vectorLogo,casiaLogo,randstadLogo,starLogo,startPeopleLogo]
    return (
        <Mydiv className={`border-b border-dashed border-secondary pb-10 mb-10`}>
           <h2 className='sm:text-3xl mb-5 text-center font-extrabold text-secondary '>We've helped thousands of sales teams</h2>
            <Marquee >
          {
            brandLogos.map((logo,i)=> <img key={i} className='md:w-40 m-5' src={logo} alt="" />)
          }
        </Marquee>
        </Mydiv>
    );
};

export default Brands;