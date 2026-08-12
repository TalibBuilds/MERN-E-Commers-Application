import  { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { House, ShoppingBag, ChefHat, CircleUser, Info } from 'lucide-react';
import { useAnimate } from 'motion/react';

const footerLinks = [
    { to: "/", label: "Home", icon: <House strokeWidth={0.75} />, id: "home" },
    { to: "/delivery", label: "Delivery", icon: <ShoppingBag strokeWidth={0.75} />, id: "delivery" },
    { to: "/menu", label: "Menu", icon: <ChefHat strokeWidth={0.75} />, id: "menu" },
    { to: "/about", label: "About", icon: <Info strokeWidth={0.75} />, id: "about" },
    { to: "/profile", label: "Profile", icon: <CircleUser strokeWidth={0.75} />, id: "profile" },
];

const MenuFooter = () => {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        if (!scope.current) return;

        const footerTimeline = [
            [scope.current, { y: 0 }, { duration: 0.4, ease: "easeOut" }],
            
            ["[data-nav='home']", { opacity: 1, y: 0 }, { duration: 0.15 }],
            ["[data-nav='delivery']", { opacity: 1, y: 0 }, { duration: 0.15 }],
            ["[data-nav='menu']", { opacity: 1, y: 0 }, { duration: 0.15 }],
            ["[data-nav='about']", { opacity: 1, y: 0 }, { duration: 0.15 }],
            ["[data-nav='profile']", { opacity: 1, y: 0 }, { duration: 0.15 }]
        ];

        animate(footerTimeline);
    }, [animate, scope]);

    return (
        <div 
            ref={scope}
            style={{ transform: "translateY(100%)" }} 
            className="tabular-nums fixed bg-[#F5F2EB] bottom-0 left-0 right-0 z-50 shadow-md flex justify-around items-center py-2 md:hidden"
        >
            {footerLinks.map(({ to, label, icon, id }) => (
                <NavLink
                    key={to}
                    to={to}
                    data-nav={id} // Selector element for the timeline hook
                    className={({ isActive }) =>
                        `flex flex-col items-center text-xs font-poppins px-3 py-2 rounded-t-lg transition-all duration-200 ${
                            isActive
                                ? "text-[#03071E] border-t-4 border-[#E85D04] bg-gray-100"
                                : "text-gray-800 border-t-4 border-transparent"
                        }`
                    }
                    style={{
                        borderTopWidth: '4px',
                        opacity: 0,     
                        transform: "translateY(100px)" 
                    }}
                >
                    <span className="mb-1">
                        {icon}
                    </span>
                    <span>{label}</span>
                </NavLink>
            ))}
        </div>
    );
};

export default MenuFooter;
