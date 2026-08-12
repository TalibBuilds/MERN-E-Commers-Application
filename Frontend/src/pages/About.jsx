import { easeInOut, motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ChefHat,
  Heart,
  Leaf,
  Clock3,
  ShieldCheck,
  Truck,
  Utensils,
  Sparkles,
  MapPin,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description:
      "We believe great food starts with great ingredients. We focus on fresh, carefully selected ingredients to maintain authentic taste and quality in every meal.",
  },
  {
    icon: ChefHat,
    title: "Made With Care",
    description:
      "Every dish is prepared with attention to flavor, presentation, and consistency so that your meal feels special whether you dine alone or with family.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Hygiene",
    description:
      "From ingredient handling to food preparation and packaging, we care about maintaining clean and reliable food standards.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description:
      "Your food should reach you fresh and ready to enjoy. Our delivery experience is designed around convenience, speed, and reliability.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Our customers are at the heart of everything we do. We continuously work to make ordering food simple, enjoyable, and convenient.",
  },
  {
    icon: Sparkles,
    title: "Better Every Day",
    description:
      "We keep improving our menu, service, technology, and overall experience based on what our customers need.",
  },
  {
    icon: Utensils,
    title: "Love for Food",
    description:
      "Food is more than something we eat. It brings people together, creates memories, and makes ordinary moments better.",
  },
];

const stats = [
  { number: "Fresh", label: "Ingredients" },
  { number: "5+", label: "Food Categories" },
  { number: "Fast", label: "Delivery Experience" },
  { number: "100%", label: "Customer Focus" },
];



const About = () => {


  return (
    <main className="min-h-screen bg-[#F5F2EB] text-[#03071E] overflow-hidden">

      {/* HERO SECTION** */}
      <section className="relative min-h-[80vh] flex items-center px-6 md:px-16 lg:px-24 py-20">

        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#E85D04]/10 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-96 h-96 rounded-full bg-[#FFBA08]/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-14 items-center">

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-poppins text-sm uppercase tracking-[0.3em] text-[#E85D04] mb-5">
              Welcome to Dish & Co.
            </p>

            <h1 className="font-cinzel text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Good Food.
              <br />
              <span className="text-[#E85D04]">
                Good Mood.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-[#03071E]/70 font-poppins leading-8">
              Dish & Co. is built around a simple idea — great food
              should be easy to discover, easy to order, and even
              better to enjoy.
            </p>

            <p className="mt-4 max-w-xl text-[#03071E]/60 font-poppins leading-7">
              From comforting classics to flavorful favorites,
              we bring together a carefully selected range of
              dishes designed to make every meal a little more
              memorable.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-3 rounded-full bg-[#E85D04] text-white font-poppins shadow-lg cursor-pointer"
              >
                <Link to={'/menu'}>
                  Explore Our Menu
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-3 rounded-full border border-[#03071E]/20 font-poppins"
              >
                <Link to={'/delivery'}>
                  How We Deliver
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-lg">

              <div className="absolute inset-0 bg-[#E85D04]/20 rounded-[4rem] rotate-6" />

              <img
                src="/images/burger.avif"
                alt="Delicious food from Dish & Co."
                className="relative w-full h-[450px] object-cover rounded-[4rem] shadow-2xl"
              />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}

                className="absolute -bottom-6 -left-5 md:-left-10 bg-white px-5 py-4 rounded-2xl shadow-xl select-none"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    whileTap={{ scale: 19, background: "red" }}
                    transition={{ ease: easeInOut }}

                    className="bg-[#FFBA08]/20 p-3 rounded-full">
                    {/* rating  with star animation */}

                    <Star
                      size={22}
                      className="text-[#E85D04]"
                    />

                  </motion.div>

                  <div>
                    <p className="font-bold font-poppins">
                      Made With Love
                    </p>
                    <p className="text-xs text-gray-500 font-poppins">
                      Every single meal
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>


      {/* ================= INTRO ================= */}
      <section className="px-6 md:px-16 lg:px-24 py-24 bg-white">

        <div className="max-w-5xl mx-auto text-center">

          <p className="font-poppins text-sm uppercase tracking-[0.3em] text-[#E85D04]">
            Our Story
          </p>

          <h2 className="mt-4 font-cinzel text-4xl md:text-5xl font-bold">
            More Than Just A Food App
          </h2>

          <p className="mt-8 text-gray-600 font-poppins leading-8">
            Dish & Co. was created to make the experience of
            discovering and ordering food feel effortless.
            We understand that people have different tastes,
            different schedules, and different reasons for
            ordering food.
          </p>

          <p className="mt-5 text-gray-600 font-poppins leading-8">
            Sometimes you want a quick meal after a long day.
            Sometimes you want something comforting. Sometimes
            you want to explore something completely new.
            Dish & Co. is designed to be there for all of those
            moments.
          </p>

          <p className="mt-5 text-gray-600 font-poppins leading-8">
            Our goal is to combine delicious food, a smooth
            digital experience, reliable delivery, and a strong
            focus on customer satisfaction into one simple
            experience.
          </p>

        </div>
      </section>


      {/* ================= STATS ================= */}
      <section className="px-6 md:px-16 lg:px-24 py-16 bg-[#03071E] text-white">

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">

          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-3xl md:text-4xl font-cinzel font-bold text-[#FFBA08]">
                {stat.number}
              </h3>

              <p className="mt-2 text-sm font-poppins text-white/60">
                {stat.label}
              </p>
            </motion.div>
          ))}

        </div>
      </section>


      {/* ================= WHAT MAKES US DIFFERENT ================= */}
      <section className="px-6 md:px-16 lg:px-24 py-24">

        <div className="max-w-7xl mx-auto">

          <div className="max-w-2xl mb-14">
            <p className="font-poppins text-sm uppercase tracking-[0.3em] text-[#E85D04]">
              Why Dish & Co.
            </p>

            <h2 className="mt-4 font-cinzel text-4xl md:text-5xl font-bold">
              What Makes Us Different?
            </h2>

            <p className="mt-5 font-poppins text-gray-600 leading-7">
              We don't want food ordering to feel complicated.
              Everything we build is focused on making the
              journey from choosing your food to enjoying it
              simple and reliable.
            </p>
          </div>


          <div className="grid md:grid-cols-2 gap-6">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -5 }}
                  className="p-7 rounded-3xl bg-white shadow-sm border border-black/5"
                >

                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#E85D04]/10 text-[#E85D04]">
                    <Icon size={27} strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-6 text-xl font-cinzel font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-gray-600 font-poppins text-sm leading-7">
                    {feature.description}
                  </p>

                </motion.div>
              );
            })}

          </div>

        </div>
      </section>


      {/* ================= FOOD PHILOSOPHY ================= */}
      <section className="px-6 md:px-16 lg:px-24 py-24 bg-[#FFF8EC]">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-poppins text-sm uppercase tracking-[0.3em] text-[#E85D04]">
              Our Philosophy
            </p>

            <h2 className="mt-4 font-cinzel text-4xl md:text-5xl font-bold">
              Food Should Feel Special
            </h2>

            <p className="mt-6 font-poppins text-gray-600 leading-8">
              We believe food has the power to change the
              atmosphere of an entire day. A good meal can
              turn a busy afternoon into a relaxing moment,
              bring friends together, or become the highlight
              of a family evening.
            </p>

            <p className="mt-5 font-poppins text-gray-600 leading-8">
              That's why we care about more than simply putting
              dishes on a menu. We care about flavor, variety,
              convenience, presentation, and the complete
              experience.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <motion.div
              whileHover={{scale:1.2}}
            transition={{ type: "spring", stiffness: 400, damping: 5 }}
              className="p-3 rounded-full bg-[#E85D04] text-white">
                <Heart size={20} />
              </motion.div>

              <p className="font-poppins font-medium">
                Made for people who genuinely love food.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
            whileHover={{scale:1.2}}
            whileTap={{scale:10}}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}

            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] mx-auto rounded-full shadow-2xl overflow-hidden group ">
              <motion.img
                src="/images/food-philosophy.jpg"
                alt="Food prepared with care"
                className="absolute inset-0 w-full h-full object-cover rounded-full cursor-pointer transition-opacity duration-500 group-hover:opacity-0"
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
              <p className="absolute inset-0 z-10 flex items-center justify-center px-8 text-center rounded-full bg-[#F48C05] text-[#FDFBF7] text-sm md:text-base font-cinzel opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                Every dish starts with what's fresh that morning — sourced close, cooked simply, and plated with care. No shortcuts, no fillers. Just food made the way we'd want to eat it ourselves.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="px-6 md:px-16 lg:px-24 py-24 bg-white">

        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-14">

            <p className="font-poppins text-sm uppercase tracking-[0.3em] text-[#E85D04]">
              What We Believe
            </p>

            <h2 className="mt-4 font-cinzel text-4xl md:text-5xl font-bold">
              Our Core Values
            </h2>

          </div>


          <div className="grid md:grid-cols-3 gap-7">

            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ translateY: 5, rotate: 5 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="text-center p-8 rounded-3xl bg-[#F5F2EB] cursor-pointer"
                >

                  <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-[#E85D04] text-white">
                    <Icon size={27} strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-6 text-xl font-cinzel font-bold">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-sm text-gray-600 font-poppins leading-7">
                    {value.description}
                  </p>

                </motion.div>
              );
            })}

          </div>

        </div>
      </section>


      {/* ================= DELIVERY ================= */}
      <section className="px-6 md:px-16 lg:px-24 py-24">

        <div className="max-w-7xl mx-auto rounded-[3rem] bg-[#03071E] text-white p-8 md:p-14 grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <p className="font-poppins text-sm uppercase tracking-[0.3em] text-[#FFBA08]">
              From Kitchen To Door
            </p>

            <h2 className="mt-4 font-cinzel text-4xl md:text-5xl font-bold">
              Your Food,
              <br />
              Your Place.
            </h2>

            <p className="mt-6 text-white/60 font-poppins leading-8">
              With location-based delivery, Dish & Co. helps
              connect your order with your destination so you
              can enjoy your favorite food without unnecessary
              hassle.
            </p>

            <div className="mt-8 flex flex-col gap-5">

              <div className="flex items-center gap-4">
                <MapPin className="text-[#FFBA08]" />
                <span className="font-poppins">
                  Convenient location-based ordering
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Clock3 className="text-[#FFBA08]" />
                <span className="font-poppins">
                  Designed for a smooth delivery experience
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Truck className="text-[#FFBA08]" />
                <span className="font-poppins font-thin">
                  Food delivered to your doorstep
                </span>
              </div>

            </div>

          </div>

          <div className="flex justify-center">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="text-[10rem] md:text-[14rem]"
            >
              🍽️
            </motion.div>
          </div>

        </div>

      </section>


      {/* ================= MISSION ================= */}
      <section className="px-6 md:px-16 lg:px-24 py-24 bg-[#FFF8EC]">

        <div className="max-w-4xl mx-auto text-center">

          <p className="font-poppins text-sm uppercase tracking-[0.3em] text-[#E85D04]">
            Our Mission
          </p>

          <h2 className="mt-4 font-cinzel text-4xl md:text-5xl font-bold">
            Making Every Meal Worth Remembering
          </h2>

          <p className="mt-7 text-gray-600 font-poppins leading-8">
            Our mission is to create a food experience where
            quality, convenience, and technology work together.
            We want customers to feel confident when choosing
            their meal and satisfied when it arrives.
          </p>

          <p className="mt-5 text-gray-600 font-poppins leading-8">
            As Dish & Co. grows, our goal is to continue improving
            our food selection, customer experience, delivery
            system, and technology while staying true to the
            simple reason we started — our love for good food.
          </p>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="px-6 md:px-16 lg:px-24 py-24">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center"
        >

          <ChefHat
            className="mx-auto text-[#E85D04]"
            size={45}
            strokeWidth={1.2}
          />

          <h2 className="mt-6 font-cinzel text-4xl md:text-5xl font-bold">
            Ready For Something Delicious?
          </h2>

          <p className="mt-5 max-w-xl mx-auto text-gray-600 font-poppins leading-7">
            Explore our menu, discover something you love, and
            let Dish & Co. take care of the rest.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex mt-8 px-8 py-4 rounded-full bg-[#E85D04] text-white font-poppins shadow-lg"
          >
            <Link to={"/menu"}>
              Explore Menu
            </Link>
          </motion.div>

        </motion.div>

      </section>

    </main>
  );
};

export default About;
