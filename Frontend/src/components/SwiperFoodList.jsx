import FoodCard from '../components/FoodCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'



const SwiperFoodList = ({ items }) => {
    console.log("Swipercard rerender")
    return (
        <>
            <div className="min-h-2xl bg-gray-50 p-3 sm:p-6">

                <div className=' rounded-xl p-2 bg-gray-200/50'>
                    <h1 className='font-cinzel pl-2 pb-3'>Momos Section</h1>
                    <Swiper
                        navigation
                        pagination={{ clickable: true }}
                        spaceBetween={16}
                        slidesPerView={2}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 5 },
                        }}
                        className="w-full"
                    >
                        {items.map((item, i) => (
                            <SwiperSlide key={i}>
                                <FoodCard {...item} />
                            </SwiperSlide>

                        ))}
                    </Swiper>
                </div>
            </div>
            <div className="min-h-2xl bg-gray-50 p-3 sm:p-6">

                <div className=' rounded-xl p-2 bg-gray-200/50'>
                    <h1 className='font-cinzel pl-2 pb-3'>Momos Section</h1>
                    <Swiper
                        navigation
                        pagination={{ clickable: true }}
                        spaceBetween={16}
                        slidesPerView={2}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 5 },
                        }}
                        className="w-full"
                    >

                        {items.map((item, i) => (
                            <SwiperSlide key={i}>
                                <FoodCard {...item} />
                            </SwiperSlide>

                        ))}
                    </Swiper>
                </div>
            </div>
            <div className="min-h-2xl bg-gray-50 p-3 sm:p-6">

                <div className=' rounded-xl p-2 bg-gray-200/50'>
                    <h1 className='font-cinzel pl-2 pb-3'>Momos Section</h1>
                    <Swiper
                        navigation
                        pagination={{ clickable: true }}
                        spaceBetween={16} 
                        slidesPerView={2}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 5 },
                        }}
                        className="w-full"
                    >
                        {items.map((item, i) => (
                            <SwiperSlide key={i}>
                                <FoodCard {...item} />
                            </SwiperSlide>

                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default SwiperFoodList
