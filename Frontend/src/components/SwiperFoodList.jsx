import FoodCard from '../components/FoodCard';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SwiperFoodList = ({ items = [], category }) => {

    if (!items.length) {
        return null;
    }

    return (
        <section className="min-h-2xl  p-3 sm:p-6 lg:pt-25">

            <div
                
                className="rounded-xl p-2 bg-gray-200/50">

                <h2 className="font-cinzel font-extrabold pl-3 pb-3 md:text-2xl text-[#F48C05]">
                    {category}
                </h2>

                <Swiper
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={16}
                    slidesPerView={2}
                    breakpoints={{
                        640: {
                            slidesPerView: 3
                        },
                        768: {
                            slidesPerView: 4
                        },
                        1024: {
                            slidesPerView: 5
                        }
                    }}
                    className="w-full"
                >

                    {items.map((item) => (
                        <SwiperSlide key={item._id}>
                            <FoodCard {...item} />
                        </SwiperSlide>
                    ))}

                </Swiper>

            </div>

        </section>
    );
};

export default SwiperFoodList;