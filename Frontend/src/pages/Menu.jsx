import { motion } from 'motion/react';
import { Link } from "react-router-dom";
import SwiperFoodList from '../components/SwiperFoodList';
import { useEffect, useState } from 'react';
import AxiosInstence from '../utils/AxiosInstence';
import SliderBanner from '../components/SliderBanner'


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
        alt: "Free Delivery",
    },
];

const Menu = () => {

    const [categoryFoods, setCategoryFoods] = useState({
        Chicken: [],
        Biryani: [],
        Pizza: [],
        Momo: []
    });

    useEffect(() => {

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

            } catch (error) {
                console.error("Failed to fetch foods:", error);
            }
        };

        fetchCategoryFoods();

    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

  {/* Header */}
  <SliderBanner slides={slides} />

            {/* Food sections */}
            <SwiperFoodList
                items={categoryFoods.Chicken}
                category="Chicken"
            />

            <SwiperFoodList
                items={categoryFoods.Biryani}
                category="Biryani"
            />

            <SwiperFoodList
                items={categoryFoods.Pizza}
                category="Pizza"
            />

            <SwiperFoodList
                items={categoryFoods.Momo}
                category="Momo"
            />


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
                        to="/order"
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