import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Keyboard } from "swiper/modules";
import { memo, useMemo } from "react"
import { easeOut, motion } from 'motion/react';

import "swiper/css";
import "swiper/css/pagination";

// Memoized slide component for better performance
const SlideImage = memo(({ slide, isFirst }) => (
  <>
    {/* Desktop / tablet image */}
    <img
      src={slide.desktop}
      alt={slide.alt || "Banner slide"}
      className="hidden sm:block w-full aspect-[16/5] object-cover"
      loading={isFirst ? "eager" : "lazy"}
      decoding={isFirst ? "sync" : "async"}
    />
    {/* Mobile image */}
    <img
      src={slide.mobile}
      alt={slide.alt || "Banner slide"}
      className="block sm:hidden w-full aspect-[4/5] object-cover"
      loading={isFirst ? "eager" : "lazy"}
      decoding={isFirst ? "sync" : "async"}
    />
  </>
));

SlideImage.displayName = "SlideImage";

const SliderBanner = ({ slides = [] }) => {
  
  // Memoize slides BEFORE any conditional logic
  const memoizedSlides = useMemo(() => slides, [slides]);

  // Handle empty slides AFTER hooks
  if (!memoizedSlides || memoizedSlides.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, x: 100 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ ease: easeOut, duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full p-5"
    >
      <Swiper
        modules={[Autoplay, Pagination, Keyboard]}
        autoplay={{ 
          delay: 3000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true 
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true 
        }}
        keyboard={{ enabled: true }}
        loop={memoizedSlides.length > 1}
        className="w-full rounded-2xl overflow-hidden"
        role="region"
        aria-label="Image carousel"
      >
        {memoizedSlides.map((slide, index) => (
          <SwiperSlide key={slide.id || `slide-${index}`}>
            <SlideImage slide={slide} isFirst={index === 0} />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default memo(SliderBanner, (prevProps, nextProps) => {
  return prevProps.slides === nextProps.slides;
});