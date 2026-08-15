import { motion } from 'motion/react'
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='bg-gradient-to-r from-[#E85D04] to-[#F48C05] text-white py-12 px-4 sm:px-6 lg:pt-28 text-center'
            >
                <h1 className='text-4xl sm:text-5xl font-cinzel font-bold mb-4'>Our Delicious Menu</h1>
                <p className='text-lg sm:text-xl font-poppins max-w-2xl mx-auto'>
                    Experience authentic flavors with our carefully curated selection of dishes. Choose your favorites and place your order today!
                </p>
            </motion.div>


            {/* Footer CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className='bg-[#03071E] text-white py-12 px-4 sm:px-6 text-center'
            >
                <h3 className='text-3xl font-cinzel font-bold mb-4'>Ready to Order?</h3>
                <p className='text-lg font-poppins mb-6'>Add items to your cart and proceed to checkout</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='bg-[#E85D04] hover:bg-[#F48C05] text-white px-8 py-3 rounded-full font-poppins text-lg transition'
                >
                   <Link to="/order"> Go to Cart</Link>
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Menu;