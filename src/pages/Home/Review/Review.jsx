import React, { useEffect, useState } from 'react';
import reviewImg from "../../../assets/review.png"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow,  Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';


const Review = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('/reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <div className='my-10 px-5 sm:px-0'>
            <div className='flex flex-col justify-center items-center'>
                <img className='w-60' src={reviewImg} alt="" />
                <h1 className='text-xl sm:text-4xl  font-extrabold '>What our customers are sayings</h1>
                <p className='text-sm sm:text-lg text-accent px-5 text-center'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>
            <div className='mt-5 sm:hidden'>
                <>
                    <Swiper
                        
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={1}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: '0%',
                            depth: 0,
                            modifier: 1,
                            slideShadows: true,
                            scale: .75
                        }}
                        autoplay={{ delay: 2000 }}
                        loop={true}
                        pagination={true}
                        navigation={true}
                        modules={[EffectCoverflow,Pagination, Autoplay]}
                        className="mySwiper"
                    >
                        {
                            reviews.map(review => <SwiperSlide>
                                <ReviewCard review={review} />
                            </SwiperSlide>)
                        }
                    </Swiper>
                </>
            </div>
            <div className='mt-5 hidden sm:block'>
                <>
                    <Swiper
                        
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={3}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: '0%',
                            depth: 0,
                            modifier: 1,
                            slideShadows: true,
                            scale: .75
                        }}
                        autoplay={{ delay: 2000 }}
                        loop={true}
                        pagination={true}
                        navigation={true}
                        modules={[EffectCoverflow,Pagination, Autoplay]}
                        className="mySwiper"
                    >
                        {
                            reviews.map(review => <SwiperSlide>
                                <ReviewCard review={review} />
                            </SwiperSlide>)
                        }
                    </Swiper>
                </>
            </div>
        </div>
    );
};

export default Review;