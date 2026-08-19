import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const shortcuts = [
    { label: "Home", to: "/" },
    { label: "Menu", to: "/menu" },
    { label: "About", hash: "/about" },
    { label: "Orders", hash: "/orders" },
    { label: "Profile", to: "/profile" },
    { label: "Contact", hash: "/contact" },
];

const legal = [
    { label: "Privacy Policy", hash: "#privacy" },
    { label: "Terms of Service", hash: "#terms" },
];

const socials = [
    { label: "Github", href: "https://github.com/TalibBuilds" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/talib-ansari-8b92923a4/" },
    { label: "Instagram", href: "https://www.instagram.com/stories/trainwith_beast/" },
];

const Footer = () => {
    return (
        <footer className="w-full bg-[#E85D04] border-t border-black/5 px-6 sm:px-10 md:px-16 pt-14 font-[Poppins] pb-10 mt-10 mb-10 md:mb-0">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-12 md:gap-8">

                {/* Brand column */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex-1 md:max-w-xs"
                >
                    <h2 className="font-[Cinzel] text-2xl sm:text-3xl tracking-wide text-[#fbf2df]">
                        DISH & CO.
                    </h2>
                    <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#fbf2df]/60">
                        Designed for the everyday, built to feel effortless. Scan, tap,
                        and go.
                    </p>
                </motion.div>

                {/* Link columns */}
                <div className="flex-[2] flex flex-col sm:flex-row justify-between gap-10 sm:gap-6">

                    {/* Shortcuts */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    >
                        <h3 className="font-[Cinzel] text-sm tracking-[0.15em] uppercase text-[#fbf2df] mb-4">
                            Shortcuts
                        </h3>
                        <ul className="space-y-2.5">
                            {shortcuts.map((item) => (
                                <li key={item.label}>
                                    {item.to ? (
                                        <Link
                                            to={item.to}
                                            className="text-sm text-[#fbf2df]/70 hover:text-[#1F1B16] transition-colors duration-200"
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <a
                                            href={item.hash}
                                            className="text-sm text-[#fbf2df]/70 hover:text-[#1F1B16] transition-colors duration-200"
                                        >
                                            {item.label}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Legal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    >
                        <h3 className="font-[Cinzel] text-sm tracking-[0.15em] uppercase text-[#fbf2df] mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-2.5">
                            {legal.map((item) => (
                                <li key={item.label}>
                                    {item.to ? (
                                        <Link
                                            to={item.to}
                                            className="text-sm text-[#fbf2df]/70 hover:text-[#1F1B16] transition-colors duration-200"
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <a
                                            href={item.hash}
                                            className="text-sm text-[#fbf2df]/70 hover:text-[#1F1B16] transition-colors duration-200"
                                        >
                                            {item.label}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Socials */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    >
                        <h3 className="font-[Cinzel] text-sm tracking-[0.15em] uppercase text-[#fbf2df] mb-4">
                            Follow
                        </h3>
                        <ul className="space-y-2.5">
                            {socials.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        className="text-sm text-[#fbf2df]/70 hover:text-[#1F1B16] transition-colors duration-200"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>

            {/* Divider */}
            <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-black/5 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#fbf2df]/50 text-center sm:text-left">
                    © {new Date().getFullYear()} Brandname. All rights reserved.
                </p>
                <p className="text-xs text-[#fbf2df]/50 tracking-wide">
                    Made with care.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
