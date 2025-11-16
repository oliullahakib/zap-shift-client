import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import heroImg1 from "../../../assets/banner/banner1.png"
import heroImg2 from "../../../assets/banner/banner2.png"
import heroImg3 from "../../../assets/banner/banner3.png"
const Banner = () => {
    const bannerImg = [heroImg1, heroImg2, heroImg3]
    return (
        <div>
            <Carousel
            autoPlay={true}
            infiniteLoop={true}
            stopOnHover={true}
            interval={2000}
      
            >
                {
                    bannerImg.map((img, i) => <div key={i}>
                        <img src={img} />
                    </div>)
                }

            </Carousel>
        </div>
    );
};

export default Banner;