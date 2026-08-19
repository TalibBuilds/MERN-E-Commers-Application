import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation } from 'react-router-dom'
import SerchFoodInput from "./SerchFoodInput";


import AxiosInstence from "../utils/AxiosInstence";
import { setUser } from "../redux/userSlice";

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/orders", label: "Orders" },
    { to: "/menu", label: "Menu" },
    { to: "/about", label: "About" },
    { to: "/profile", label: "Profile" }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.25,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: -65 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 120, damping: 9 }
    },
};

const textOptions = [
    "Hungry? Order Now!",
    "Delicious Meals Delivered Fast!",
    "Satisfy Your Cravings Today!",
    "Fresh Ingredients, Tasty Dishes!",
    "Your Favorite Meals, Just a Click Away!"
]


const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.user.currentUser);

    const [loading, setLoading] = useState(false);


    const getLocation = () => {

        if (loading) return;

        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported");
            return;
        }

        setLoading(true);

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                try {

                    const { latitude, longitude } = position.coords;

                    // Reverse Geocoding
                    const { data } = await axios.get(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                    );

                    const address = data.address;

                    const locationData = {
                        latitude,
                        longitude,
                        city:
                            address.city ||
                            address.town ||
                            address.village ||
                            address.suburb ||
                            address.county ||
                            "Unknown",
                        fullAddress: data.display_name,
                    };

                    // Save to MongoDB*********
                    const res = await AxiosInstence.patch(
                        "/api/auth/location",
                        locationData
                    );

                    // Update Redux******
                    dispatch(setUser(res.data.user));

                    toast.success("Location added successfully");

                } catch (err) {

                    console.error(err);

                    toast.error(
                        err.response?.data?.message ||
                        "Unable to fetch location"
                    );

                } finally {
                    setLoading(false);
                }

            },

            (error) => {

                setLoading(false);

                toast.error(error.message);

            }

        );
    };


    // textoption animation*****
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
        }, 3000); // Change text every 3 seconds

        return () => clearInterval(interval);
    });

    const location = useLocation();

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex items-end justify-between md:mx-25 md:px-8 px-4 py-3 sticky md:fixed top-0 left-0 right-0 z-40 md:rounded-full shadow-sm shadow-[#F5F2EB] md:shadow-none bg-[#F5F2EB] md:bg-transparent"
            >

                <h1 className='text-[25px] text-shadow-2xl mb-5 md:m-0 md:text-3xl font-cinzel text-[#03071E] md:text-[#FFBA08] uppercase font-extrabold whitespace-nowrap'>
                    {
                        location.pathname === "/" && "Dish & Co"
                    }
                </h1>

                {/* Desktop Menu */}
                <div className='px-3 hidden md:block'>
                    <motion.ul
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className='flex items-end gap-5 text-[#03071E] md:text-[#2B2D42] font-poppins select-none'
                    >
                        {navLinks.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) => isActive ?
                                    'font-extralight cursor-pointer text-[#FFBA08]' :
                                    'font-extralight cursor-pointer capitalize'}
                            >
                                <motion.li variants={itemVariants}>
                                    {label}
                                </motion.li>
                            </NavLink>
                        ))}
                    </motion.ul>
                </div>

                {/* Register button always visible */}
                {
                    currentUser ? (

                        <div className="flex flex-col items-end gap-2">

                            <p
                                className="text-xs sm:text-sm text-gray-600 font-poppins"
                            >
                                Hello{" "}
                                <motion.span
                                    animate={{ scale: [1, 1.1, 1], color: ["#3a5efc", "#FCA311", "#d837bd"] }}
                                    transition={{
                                        duration: 2.4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="inline-block"
                                >
                                    {currentUser.userName}
                                </motion.span>
                            </p>

                            {/* ANIMATION TEXT MOTION****** */}
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={textIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="tabular-nums text-[11px] sm:text-sm text-gray-600 font-poppins overflow-hidden ">
                                    <span className="text-[#E85D04]">
                                        {textOptions[textIndex]}
                                    </span>
                                </motion.p>
                            </AnimatePresence>


                            {/*if is Location available and on home page**** */}
                            {
                                location.pathname === "/" ? (
                                    currentUser?.location?.city ? (

                                        <div
                                            className="max-w-42 sm:max-w-48 md:max-w-64 lg:max-w-80 px-3 py-2 rounded-full bg-[#6f5f3f]  text-[#F5F2EB] shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] text-xs font-poppins truncate select-none cursor-pointer"
                                            title={currentUser?.location?.fullAddress}
                                        >
                                            {currentUser?.location?.fullAddress}
                                        </div>

                                    ) : (
                                        // { if location is not available then show button to add location }***
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 10,
                                            }}
                                            disabled={loading}
                                            onClick={getLocation}
                                            className="bg-[#03071E] text-[#F5F2EB] rounded-full px-4 py-2 text-xs font-poppins disabled:opacity-60 cursor-pointer"
                                        >
                                            {loading ? "Getting Location..." : "Add Location 📍"}
                                        </motion.button>

                                    )
                                ) :

                                    //  Search input button *** 
                                    <SerchFoodInput /> 
                                    
                            }

                        </div>

                    ) : (

                        <motion.div
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/register", { replace: true })}
                        >
                            <button className="flex items-center gap-2 bg-[#E85D04] text-[#F5F2EB] px-7 py-2 rounded-full font-poppins cursor-pointer hover:scale-105 transition">

                                Register

                                <img
                                    src="/images/button-svg.png"
                                    alt="Icon"
                                    className="h-7 w-7"
                                />
                            </button>
                        </motion.div>

                    )
                }
            </motion.nav>
        </>
    );
}

export default Navbar;