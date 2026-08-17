import { easeIn, motion } from "motion/react";

const FoodCard = ({
    foodImage,
    foodName,
    description,
    price
}) => {

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.7,  }}
            whileInView={{ opacity: 1, scale: 1, }}
            transition={{ ease: easeIn, duration: 0.7,type:"spring",stiffness:400,damping:10}}
            whileTap={{scale:0.95}}
            viewport={{ once: true }}
            className="w-full aspect-[3/4] rounded-lg flex flex-col overflow-hidden shadow-lg hover:shadow-md transition-shadow cursor-pointer">

            {/* Image */}
            <div className="w-full h-40 sm:h-36 md:h-60 overflow-hidden">

                <img
                    src={foodImage}
                    alt={foodName}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.src = "/images/food-placeholder.png";
                    }}
                />

            </div>


            {/* Food information */}
            <div className="flex-1 flex flex-col justify-center items-center text-center gap-0  sm:p-3 overflow-hidden select-none">

                <h3 className="text-[14px] sm:text-sm md:text-base font-semibold text-gray-900 leading-tight line-clamp-2 select-none">
                    {foodName}
                </h3>

                <p className="text-[12px] sm:text-xs text-gray-500 leading-snug line-clamp-2 select-none">
                    {description}
                </p>

            </div>

            {/* Price */}
            <div className="pb-2 sm:pb-3 pt-1 border-t border-gray-100 text-center">

                <span className="text-[13px] sm:text-sm font-bold text-[#E85D04]">
                    ₹{price}
                </span>

            </div>

        </motion.div>
    );
};

export default FoodCard;

