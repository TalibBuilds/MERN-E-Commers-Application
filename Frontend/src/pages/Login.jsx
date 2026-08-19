import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import AxiosInstence from "../utils/AxiosInstence";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await AxiosInstence.post("/api/auth/login", data);
            dispatch(setUser(response.data?.user))
            toast.success(response.data?.message || "Login successful");
            navigate(-1);
            
        } catch (err) {
            console.error(err);
            toast.error(
                err.response?.data?.message || "Something went wrong"
            );
        }
    };
    

    return (
        <section className="min-h-screen w-full bg-[#F5F2EB] flex flex-col md:flex-row font-[Poppins] md:p-15 md:mt-20">

            {/* Left Section */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-6 sm:px-10 md:px-16 py-12 md:py-0">

                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="w-full max-w-md"
                >

                    <h1 className="font-[Cinzel] text-3xl sm:text-4xl text-[#1F1B16] mb-3">
                        Welcome Back
                    </h1>

                    <p className="text-sm sm:text-[15px] text-[#1F1B16]/60 leading-relaxed mb-8">
                        Sign in to pick up right where you left off — your saved
                        preferences, order history and exclusive member offers.
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-5"
                    >
 
                        {/* Identifier */}
                        <div>
                            <label
                                htmlFor="identifier"
                                className="text-sm font-medium text-[#1F1B16]"
                            >
                                Mobile Number or Email
                            </label>

                            <input
                                id="identifier"
                                type="text"
                                placeholder="Enter mobile number or email"
                                {...register("identifier", {
                                    required: "Email or Mobile is required",
                                })}
                                className="mt-1 w-full px-4 py-3 rounded-xl border border-black/10 bg-white outline-none focus:border-[#F48C05]"
                            />

                            {errors.identifier && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.identifier.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-[#1F1B16]"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                className="mt-1 w-full px-4 py-3 rounded-xl border border-black/10 bg-white outline-none focus:border-[#F48C05]"
                            />

                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            disabled={isSubmitting}
                            type="submit"
                            className="mt-2 w-full py-3 rounded-xl bg-[#F48C05] text-white font-medium disabled:opacity-60"
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </motion.button>
                    </form>

                    {/* Mobile Button */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="button"
                        className="md:hidden mt-5 w-full py-3 rounded-xl border border-[#F48C05] text-[#F48C05] hover:bg-[#F48C05] hover:text-white transition"
                    >
                        Download App
                    </motion.button>

                    <h3 className="text-center text-xs mt-6 text-[#1F1B16]/70">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-[#F48C05] font-medium hover:underline"
                        >
                            Register
                        </Link>
                    </h3>

                </motion.div>
            </div>

            {/* Right Section */}
            <div className="relative hidden md:flex w-1/2 items-center justify-center bg-[#F48C05]/10">

                <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    src="/images/veggin.webp"
                    alt="Vegetables"
                    className="w-50 absolute left-0"
                />

                <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    src="/images/shushi.webp"
                    alt="Sushi"
                    className="w-80 absolute right-0"
                />

                <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    src="/images/leaf.webp"
                    alt="Leaf"
                    className="w-30 absolute top-10 left-50"
                />

            </div>
        </section>
    );
};

export default Login;