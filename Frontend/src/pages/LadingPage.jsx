import { useNavigate } from 'react-router-dom';
import ResponsiveBanner from '../components/ResponsiveBanner';
import { motion } from 'motion/react';
import { ArrowBigDownDash } from 'lucide-react'

const LadingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">

      {/* Section 1 */}
      <section className='bg-[#FDFBF7] min-h-screen w-full md:pt-25 pt-5 px-3 pb-12'>

        <div className='text-center flex flex-col gap-2 md:gap-2 py-2'>
          <motion.h1
            initial={{ x: -190, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ inherit: true, duration: 0.8 }}
            className='text-6xl md:text-9xl font-cinzel text-[#03071E] select-none '>
            The Perfect
            <span className='text-[#F48C05] text-6xl font-futura font-thin select-none'> Daily</span>
          </motion.h1>
          <motion.h1
            initial={{ x: 190, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ inherit: true, duration: 0.8 }}
            className='text-6xl md:text-9xl font-cinzel text-[#03071E] select-none'>
            <span className='text-[#F48C05] text-6xl font-futura font-thin select-none'>Meal </span>
            Solution
          </motion.h1>
        </div>

        <div className='flex items-center justify-center'>
          <motion.button
            whileHover={{ scale: 1.1, opacity: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 5 }}
            onClick={() => navigate('/menu')}
            className="bg-[#E85D04] md:mt-0 mt-5 px-7 py-2.5 rounded-full text-[#F5F2EB] shadow-[#F5F2EB] shadow-inner font-poppins cursor-pointer select-none"
          >
            Order Meal Plan
          </motion.button>
        </div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className='mt-10'>
          <ResponsiveBanner
            desktopSrc="/images/desktop-banner.jpg"
            mobileSrc="/images/m-b.jpg"
            altText="The Perfect Daily Meal Solution Hero Banner"
          />
        </motion.div>
      </section>

      {/* Section 2 */}
      <section className='h-screen md:h-auto  flex md:flex-row flex-col p-10 gap-5 '>
        <div
          className=" p-2 relative flex justify-center items-center"
        >
          <motion.img
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, opacity: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            exit={{ scale: 0.7, opacity: 0 }}

            className='w-3' src="/images/blackmobile.webp" alt="Blank UI" className="w-full h-auto block" />

          <motion.img
            initial={{ rotate: 0 }}
            whileInView={{ rotate: [0, 90, 90, 180, 180, 270, 270, 360, 360, 0] }}
            viewport={{ once: false }}
            transition={{
              duration: 19,
              times: [0, 0.05, 0.25, 0.30, 0.50, 0.55, 0.75, 0.80, 1.0], // Controls the exact movement and pause timing
              repeat: Infinity,
              ease: "linear"
            }}
            exit={{ scale: 0.7, opacity: 0 }}
            src="/images/Qr.png"
            alt="QR Code"
            className="absolute w-1/2 h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        {/* Downlaod Button */}
        <div
          className=' p-2 flex flex-col items-center justify-center gap-10'>
          <h1 className='whitespace-nowrap font-poppins
           text-[#03071E] text-xl '>Scan This QR For Dwonload App</h1>

          <motion.div
            whileHover={{ scale: 1.1, opacity: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 5 }}
            className='bg-[#F48C05] py-2 px-7 rounded-full flex items-center justify-center cursor-pointer'>
            <button className='flex items-center gap-2 text-white font-medium font-poppins  cursor-pointer'>
              Download App
              <ArrowBigDownDash strokeWidth={0.75} className='w-5 h-5 cursor-pointer' color='black' />
            </button>
          </motion.div>

        </div>

        <div className=' p-2 flex items-center justify-center'>
          <img className='w-full' src="/images/mobileUI.webp" alt="" />
        </div>
      </section>

    </div>
  );
};

export default LadingPage;
