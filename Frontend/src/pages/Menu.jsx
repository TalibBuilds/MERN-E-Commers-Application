import { motion, AnimatePresence } from "motion/react";
import { X } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import SwiperFoodList from '../components/SwiperFoodList';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AxiosInstence from '../utils/AxiosInstence';
import SliderBanner from '../components/SliderBanner'
import { useDispatch } from "react-redux";
import { addOrder } from "../redux/orderSlice";
import toast from "react-hot-toast";




// slider images data***
const slides = [
    {
        desktop: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=500&fit=crop",
        mobile: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=1000&fit=crop",
        alt: "Summer Sale",
    },
    {
        desktop: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=500&fit=crop",
        mobile: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop",
        alt: "New Arrivals",
    },
    {
        desktop: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&h=500&fit=crop",
        mobile: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=1000&fit=crop",
        alt: "Fresh Food Deals",
    },
    {
        desktop: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1600&h=500&fit=crop",
        mobile: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=1000&fit=crop",
        alt: "Weekend Offer",
    },
    {
        desktop: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=500&fit=crop",
        mobile: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1000&fit=crop",
        alt: "Combo Pack",
    },
    {
        desktop: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&h=500&fit=crop",
        mobile: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=1000&fit=crop",
        alt: "Festive Special",
    },
    {
        desktop: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1600&h=500&fit=crop",
        mobile: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=1000&fit=crop",
        alt: "Free orders",
    },
];



const Menu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const searchTerm = useSelector((state) => state.search.searchTerm);
    const [categoryFoods, setCategoryFoods] = useState({
        Chicken: [],
        Biryani: [],
        Pizza: [],
        Momo: []
    });
    const [searchFoods, setSearchFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleFoodSelect = (food) => {
        setSelectedFood(food);
        setQuantity(1);
    };

    const handleCloseSelection = () => {
        setSelectedFood(null);
        setQuantity(1);
    };

    // order confirm function *** fro set order in redux**
    const HandleConfirmOrder = () => {
        try {
            if (!selectedFood) return;

            dispatch(addOrder({
                ...selectedFood,
                quantity,
            }));

            setSelectedFood(null);
            setQuantity(1);
            toast.success("Order Confirm")
            navigate('/orders')

        } catch (err) {
            console.log(err)
            toast.error("Somthing Went Wrong")
        }
    }

    useEffect(() => {

        const controller = new AbortController();

        const fetchCategoryFoods = async () => {
            try {

                const categories = ["Chicken", "Biryani", "Pizza", "Momo"];

                const responses = await Promise.all(
                    categories.map(category =>
                        AxiosInstence.get(
                            `/api/food/items?category=${category}&limit=10`
                        )
                    )
                );

                const data = {};

                categories.forEach((category, index) => {
                    data[category] = responses[index].data.foods;
                });

                setCategoryFoods(data);
                setSearchFoods([]);

            } catch (error) {
                if (error.name !== "CanceledError") {
                    console.error("Failed to fetch foods:", error);
                }
            }
        };

        const fetchSearchFoods = async () => {
            try {
                const response = await AxiosInstence.get(
                    `/api/food/items?search=${encodeURIComponent(searchTerm)}&limit=100`,
                    { signal: controller.signal }
                );

                setSearchFoods(response.data.foods);
            } catch (error) {
                if (error.name !== "CanceledError") {
                    console.error("Failed to search foods:", error);
                }
            }
        };

        const timeoutId = searchTerm
            ? setTimeout(fetchSearchFoods, 400)
            : fetchCategoryFoods();

        return () => {
            if (searchTerm) {
                clearTimeout(timeoutId);
            }
            controller.abort();
        };

    }, [searchTerm]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

            {/* Header */}
            <SliderBanner slides={slides} />

            {/* Food sections */}
            {searchTerm ? (
                <SwiperFoodList
                    items={searchFoods}
                    category="Search results"
                    onFoodSelect={handleFoodSelect}
                />
            ) : (
                <>
                    <SwiperFoodList items={categoryFoods.Chicken} category="Chicken" onFoodSelect={handleFoodSelect} />
                    <SwiperFoodList items={categoryFoods.Biryani} category="Biryani" onFoodSelect={handleFoodSelect} />
                    <SwiperFoodList items={categoryFoods.Pizza} category="Pizza" onFoodSelect={handleFoodSelect} />
                    <SwiperFoodList items={categoryFoods.Momo} category="Momo" onFoodSelect={handleFoodSelect} />
                </>
            )}

            {/* select food prsence **  */}
            {selectedFood && (
                <AnimatePresence>
                    {selectedFood && (
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed inset-x-0 bottom-0 z-50 min-h-[22rem] rounded-t-3xl border-t border-[#E85D04]/30 bg-white shadow-2xl px-4 sm:px-6 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]"
                        >
                            {/* drag handle */}
                            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-black/10" />

                            {/* close button */}
                            <button
                                type="button"
                                onClick={handleCloseSelection}
                                aria-label="Close selected food"
                                className="absolute top-3 right-3 sm:right-4 rounded-full p-1.5 text-[#03071E]/50 hover:bg-black/5 transition"
                            >
                                <X size={18} />
                            </button>

                            <div className="mx-auto max-w-5xl">
                                {/* top row: image + name/price */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={selectedFood.foodImage}
                                        alt={selectedFood.foodName}
                                        className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl object-cover flex-shrink-0"
                                    />
                                    <div className="min-w-0 flex-1 pr-6">
                                        <h3 className="truncate font-poppins font-semibold text-[#03071E] text-base sm:text-lg">
                                            {selectedFood.foodName}
                                        </h3>
                                        <p className="font-['DM_Sans'] text-sm text-[#03071E]/55 mt-0.5">
                                            ₹{selectedFood.price} <span className="text-[#03071E]/35">each</span>
                                        </p>
                                    </div>

                                    {/* quantity stepper — desktop inline */}
                                    <div className="hidden sm:flex items-center rounded-full border border-black/10 overflow-hidden shrink-0">
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            type="button"
                                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                            disabled={quantity <= 1}
                                            className="w-9 h-9 flex items-center justify-center font-poppins text-lg text-[#03071E] disabled:opacity-30 hover:bg-black/5 transition"
                                        >
                                            −
                                        </motion.button>
                                        <span className="w-8 text-center font-poppins font-medium text-sm text-[#03071E]">
                                            {quantity}
                                        </span>
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            type="button"
                                            onClick={() => setQuantity((q) => q + 1)}
                                            className="w-9 h-9 flex items-center justify-center font-poppins text-lg text-[#E85D04] hover:bg-black/5 transition"
                                        >
                                            +
                                        </motion.button>
                                    </div>
                                </div>

                                {/* quantity stepper — mobile, own row */}
                                <div className="flex sm:hidden items-center justify-between mt-4">
                                    <span className="font-poppins text-sm text-[#03071E]/60">Quantity</span>
                                    <div className="flex items-center rounded-full border border-black/10 overflow-hidden">
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            type="button"
                                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                            disabled={quantity <= 1}
                                            className="w-9 h-9 flex items-center justify-center font-poppins text-lg text-[#03071E] disabled:opacity-30"
                                        >
                                            −
                                        </motion.button>
                                        <span className="w-8 text-center font-poppins font-medium text-sm text-[#03071E]">
                                            {quantity}
                                        </span>
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            type="button"
                                            onClick={() => setQuantity((q) => q + 1)}
                                            className="w-9 h-9 flex items-center justify-center font-poppins text-lg text-[#E85D04]"
                                        >
                                            +
                                        </motion.button>
                                    </div>
                                </div>

                                {/* divider */}
                                <div className="h-px bg-black/5 my-4" />

                                {/* subtotal + CTA */}
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="font-['DM_Sans'] text-xs text-[#03071E]/45">Subtotal</p>
                                        <p className="font-poppins font-semibold text-lg text-[#03071E]">
                                            ₹{(selectedFood.price * quantity).toFixed(2)}
                                        </p>
                                    </div>
                                    <motion.button
                                        onClick={HandleConfirmOrder}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        type="button"
                                        className="flex-1 sm:flex-none sm:min-w-[180px] rounded-full bg-[#E85D04] px-6 py-3 font-poppins font-medium text-sm text-white"
                                    >
                                        Add to cart
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}


            {/* Footer CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-[#03071E] text-white py-12 px-4 sm:px-6 text-center"
            >
                <h3 className="text-3xl font-cinzel font-bold mb-4">
                    Ready to Order?
                </h3>

                <p className="text-lg font-poppins mb-6">
                    Add items to your cart and proceed to checkout
                </p>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                >
                    <Link
                        to="/orders"
                        className="bg-[#E85D04] hover:bg-[#F48C05] text-white px-8 py-3 rounded-full font-poppins text-lg transition inline-block"
                    >
                        Go to Cart
                    </Link>
                </motion.div>

            </motion.div>

        </div>
    );
};

export default Menu;