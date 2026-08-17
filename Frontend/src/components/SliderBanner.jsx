import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { memo } from "react"
import { easeOut, motion } from 'motion/react';


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";



const SliderBanner = ({ slides }) => {

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, x: 100 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ ease: easeOut, duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full p-5">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop
                className="w-full rounded-2xl overflow-hidden"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {/* Desktop / tablet image */}
                        <img
                            src={slide.desktop}
                            alt={slide.alt}
                            className="hidden sm:block w-full aspect-[16/5] object-cover"
                            loading={index === 0 ? "eager" : "lazy"}
                        />
                        {/* Mobile image */}
                        <img
                            src={slide.mobile}
                            alt={slide.alt}
                            className="block sm:hidden w-full aspect-[4/5] object-cover"
                            loading={index === 0 ? "eager" : "lazy"}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </motion.div>
    );
};

export default memo(SliderBanner);