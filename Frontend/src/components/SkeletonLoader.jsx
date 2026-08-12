import React from 'react'

/**
 * Reusable Skeleton Loader with shimmer effect
 * @param {string} variant - Shape type ('text' | 'circular' | 'rectangular')
 * @param {string} height - Height of the skeleton block
 * @param {string} className - Additional Tailwind utility classes
 */
const SkeletonLoader = React.memo(({ variant = 'rectangular', height = '100%', className = '' }) => {
  const baseClasses = "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"
  
  const variants = {
    text: 'h-4 rounded w-full mb-2',
    circular: 'rounded-full aspect-square',
    rectangular: 'rounded-xl w-full',
  }

  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${className}`} 
      style={{ height }}
    />
  )
})

SkeletonLoader.displayName = 'SkeletonLoader'
export default SkeletonLoader
