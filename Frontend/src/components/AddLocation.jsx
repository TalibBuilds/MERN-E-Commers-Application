import { motion } from "motion/react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AxiosInstence from "../utils/AxiosInstence";
import { setUser } from "../redux/userSlice";

const AddLocation = ({ onLocationAdded }) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const handleAddLocation = () => {
        if (loading) return;

        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported");
            return;
        }

        setLoading(true);

        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                try {
                    const { latitude, longitude } = coords;
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

                    const response = await AxiosInstence.patch(
                        "/api/auth/location",
                        locationData
                    );

                    dispatch(setUser(response.data.user));
                    onLocationAdded?.();
                    toast.success("Location added successfully");
                } catch (error) {
                    console.error(error);
                    toast.error(
                        error.response?.data?.message ||
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

    return (
        <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={handleAddLocation}
            disabled={loading}
            aria-label="Add your delivery location"
            className="cursor-pointer rounded-full bg-[#03071E] px-4 py-2 text-xs font-poppins text-[#F5F2EB]"
        >
            {loading ? "Getting Location..." : "Add Location 📍"}
        </motion.button>
    );
};

export default AddLocation;
