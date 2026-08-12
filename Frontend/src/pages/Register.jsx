import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstence from '../utils/AxiosInstence'
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            userName: "",
            email: "",
            mobileNumber: "",
            password: "",
        },
    });

const onSubmit = async (data) => {
    try {
        console.log(data);
        const response = await AxiosInstence.post("/api/auth/register", data);

        if (response.status === 201) {
            toast.success(response.data?.message || "Account created successfully");
            navigate(-1);
        }

    } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Something went wrong");
    }
};

    return (
        <section className="min-h-screen w-full bg-[#F5F2EB] flex flex-col md:flex-row font-[Poppins] md:p-15 md:pt-29">

            {/* Left: Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-6 sm:px-10 md:px-16 py-12 md:py-0">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full max-w-md"
                >
                    {/* Heading + advantages */}
                    <h1 className="font-[Cinzel] text-3xl sm:text-4xl text-[#1F1B16] mb-3">
                        Create Your Account
                    </h1>
                    <p className="text-sm sm:text-[15px] leading-relaxed text-[#1F1B16]/60 mb-8">
                        Join us to unlock personalized recommendations, faster checkout,
                        and exclusive member-only offers — all synced across your
                        devices in seconds.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

                        {/* Username */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="userName" className="text-sm font-medium text-[#1F1B16]">
                                Username
                            </label>

                            <input
                                type="text"
                                autoComplete="username"
                                placeholder="Enter your username"
                                {...register("userName", {
                                    required: "Username is required",
                                    minLength: {
                                        value: 3,
                                        message: "Username must be at least 3 characters",
                                    },
                                })}
                                className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-sm text-[#1F1B16] placeholder:text-[#1F1B16]/35 outline-none focus:border-[#F48C05]"
                            />

                            {errors.userName && (
                                <p className="text-xs text-red-500">
                                    {errors.userName.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-medium text-[#1F1B16]">
                                Email
                            </label>

                            <input
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email address",
                                    },
                                })}
                                className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-sm text-[#1F1B16] placeholder:text-[#1F1B16]/35 outline-none focus:border-[#F48C05]"
                            />

                            {errors.email && (
                                <p className="text-xs text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Mobile */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="mobileNumber" className="text-sm font-medium text-[#1F1B16]">
                                Mobile Number
                            </label>

                            <input
                                type="tel"
                                maxLength={10}
                                autoComplete="tel"
                                placeholder="Enter your mobile number"
                                {...register("mobileNumber", {
                                    required: "Mobile number is required",
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message: "Enter a valid 10-digit mobile number",
                                    },
                                })}
                                className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-sm text-[#1F1B16] placeholder:text-[#1F1B16]/35 outline-none focus:border-[#F48C05]"
                            />

                            {errors.mobileNumber && (
                                <p className="text-xs text-red-500">
                                    {errors.mobileNumber.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="password" className="text-sm font-medium text-[#1F1B16]">
                                Password
                            </label>

                            <input
                                type="password"
                                autoComplete="new-password"
                                placeholder="Create a password"
                                {...register("password", {
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                                        message:
                                            "Min 6 chars with uppercase, lowercase & number",
                                    },
                                })}
                                className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-sm text-[#1F1B16] placeholder:text-[#1F1B16]/35 outline-none focus:border-[#F48C05]"
                            />

                            {errors.password && (
                                <p className="text-xs text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="mt-2 w-full py-3 rounded-xl bg-[#F48C05] text-white text-sm font-medium hover:bg-[#d97a00] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Creating Account..." : "Create Account"}
                        </motion.button>

                    </form>

                    {/* Download App button — mobile only, external link */}
                    <a
                        href="https://codextx.netlify.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="md:hidden block mt-5"
                    >
                        <motion.button
                            whileHover={{ scale: 1.1, opacity: 0.8 }}
                            transition={{ type: "spring", stiffness: 400, damping: 5 }}
                            type="button"
                            className="w-full py-3 rounded-xl border border-[#F48C05] text-[#F48C05] text-sm font-medium tracking-wide hover:bg-[#F48C05] hover:text-white transition-colors duration-200"
                        >
                            Download App
                        </motion.button>
                    </a>

                    {/* Already have an account */}
                    <h3 className="text-center text-xs mt-6 text-[#1F1B16]/70">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#F48C05] font-medium hover:underline">
                            Login
                        </Link>
                    </h3>
                </motion.div>
            </div>

            {/* Right: Image — desktop only */}
            <div className="relative hidden md:flex w-1/2 items-center justify-center bg-[#F48C05]/10">
                <div className='flex items-center'>
                    <motion.img
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        src="/images/veggin.webp"
                        alt="Register illustration"
                        className="w-50 absolute left-0"
                    />
                    <motion.img
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        src="/images/shushi.webp"
                        alt="Register illustration"
                        className="w-80 absolute right-0"
                    />
                    <motion.img
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        src="/images/leaf.webp"
                        alt="Register illustration"
                        className="w-30 absolute top-10 left-50"
                    />
                </div>
            </div>
        </section>
    );
};

export default Register;