import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SkeletonLoader from './SkeletonLoader'

const ResponsiveBanner = React.memo(({ 
  desktopSrc, 
  mobileSrc, 
  altText = "banner image", 
  aspectRatioClasses = "h-screen md:h-[60vh]",
  containerClasses = "mt-0 md:mt-10 max-w-none md:max-w-6xl mx-auto w-full"
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  
  const targetRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  })

  const desktopScale = useTransform(scrollYProgress, [0.1, 0.4], [0.2, 1])

  return (
    <div ref={targetRef} className={`relative ${containerClasses}`}>
      {!isLoaded && (
        <SkeletonLoader variant="rectangular" className={`${aspectRatioClasses} rounded-xl md:rounded-xl`} />
      )}

      <motion.picture
        style={{
          scale: window.innerWidth > 768 ? desktopScale : 1
        }}
        className="block w-full h-full"
      >
        <source 
          media="(max-width: 768px)" 
          srcSet={mobileSrc} 
        />
        <img 
          src={desktopSrc} 
          alt={altText} 
          loading="lazy" 
          className={`w-full object-cover rounded-none md:rounded-xl transition-opacity duration-500 ${aspectRatioClasses} ${
            isLoaded ? 'opacity-100 block' : 'opacity-0 absolute top-0 left-0 -z-10'
          }`}
          onLoad={() => setIsLoaded(true)}
        />
      </motion.picture>
    </div>
  )
})

ResponsiveBanner.displayName = 'ResponsiveBanner'
export default ResponsiveBanner
