import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import AxiosInstence from "../../utils/AxiosInstence";
import  toast  from "react-hot-toast";

const ORANGE = "#E85D04";
const INK = "#03071E";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const UploadFood = () => {
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setValue("foodImage", file, { shouldValidate: true });
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      foodName: "",
      description: "",
      price: "",
      category: "",
      isAvailable: true,
      foodImage: null,
    },
  });

  useEffect(() => {
    register("foodImage", { required: "A dish image is required" });
  }, [register]);

  useEffect(() => {
    setValue("isAvailable", isAvailable);
  }, [isAvailable, setValue]);

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("foodName", data.foodName);
      formData.append("foodDescription", data.description);
      formData.append("foodPrice", data.price);
      formData.append("category", data.category);
      formData.append("isAvailable", data.isAvailable ? "true" : "false");
      formData.append("foodImage", data.foodImage);

      await AxiosInstence.post("/api/admin/upload-food-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      reset({
        foodName: "",
        description: "",
        price: "",
        category: "",
        isAvailable: true,
        foodImage: null,
      });
      setPreview(null);
      setIsAvailable(true);
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast.success("Dish uploaded successfully!");
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-start justify-center py-10 px-4 sm:px-8 md:px-16 md:py-25">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-5xl"
      >
        {/* heading */}
        <motion.div variants={fadeUp} className="mb-8 px-1">
          <span className="font-poppins text-[11px] tracking-[0.18em] uppercase text-[#E85D04]">
            Vendor &middot; New item
          </span>
          <h1 className="font-['Cinzel'] font-semibold text-3xl sm:text-4xl text-[#03071E] mt-1">
            Add a new dish
          </h1>
          <p className="font-dm-sans text-sm text-[#03071E]/55 mt-2">
            Add a photo and the details — it'll show up on the menu.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* ---------------- image dropzone ---------------- */}
          <motion.div variants={fadeUp} className="rounded-2xl p-2 bg-white border border-black/5">
            <motion.div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              animate={{
                scale: dragActive ? 1.015 : 1,
                borderColor: dragActive ? ORANGE : "rgba(3,7,30,0.14)",
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative h-72 sm:h-80 md:h-full min-h-70 rounded-xl border-2 border-dashed cursor-pointer overflow-hidden flex items-center justify-center"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                name="foodImage"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  handleFile(file);
                }}
              />

              <AnimatePresence mode="wait">
                {preview ? (
                  <motion.img
                    key="preview"
                    src={preview}
                    alt="Dish preview"
                    className="w-full object-cover"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-3 px-6 text-center"
                  >
                    <svg viewBox="0 0 100 100" width="44" height="44">
                      <g transform="rotate(-20 50 50)">
                        <path
                          d="M42,30 L42,42 Q42,48 50,48 L50,72 M46,30 L46,40 M50,30 L50,40 M54,30 L54,40"
                          fill="none"
                          stroke={INK}
                          strokeOpacity="0.3"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <g transform="rotate(20 50 50)">
                        <path
                          d="M44,30 Q60,32 58,44 Q57,50 50,50 L50,72"
                          fill="none"
                          stroke={INK}
                          strokeOpacity="0.3"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                    <p className="font-dm-sans text-sm text-[#03071E]/60">
                      Drop a photo here, or{" "}
                      <span className="text-[#E85D04] font-medium">click to upload</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* ---------------- form ---------------- */}
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl p-6 flex flex-col bg-white border border-black/5"
          >
            <label className="mb-1.5 font-poppins text-sm font-medium text-[#03071E]/80">
              Food name
            </label>
            <input
              type="text"
              placeholder="e.g. Classic Burger"
              className="w-full border border-black/10 bg-white p-3 rounded-lg mb-2 font-dm-sans text-sm outline-none transition focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20"
              {...register("foodName", { required: "Food name is required" })}
            />
            {errors.foodName && (
              <p className="mb-3 text-sm text-red-500">{errors.foodName.message}</p>
            )}

            <label className="mb-1.5 font-poppins text-sm font-medium text-[#03071E]/80">
              Description
            </label>
            <textarea
              placeholder="Short description"
              rows={4}
              className="w-full border border-black/10 bg-white p-3 rounded-lg mb-2 resize-none font-dm-sans text-sm outline-none transition focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && (
              <p className="mb-3 text-sm text-red-500">{errors.description.message}</p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 font-poppins text-sm font-medium text-[#03071E]/80">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#03071E]/40 font-dm-sans text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="INR"
                    className="w-full border border-black/10 bg-white p-3 pl-6 rounded-lg font-dm-sans text-sm outline-none transition focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20"
                    {...register("price", { required: "Price is required" })}
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-1.5 font-poppins text-sm font-medium text-[#03071E]/80">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Fast Food"
                  className="w-full border border-black/10 bg-white p-3 rounded-lg font-dm-sans text-sm outline-none transition focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20"
                  {...register("category", { required: "Category is required" })}
                />
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
                )}
              </div>
            </div>

            {/* availability toggle */}
            <div className="flex items-center justify-between mt-5 p-3.5 rounded-lg bg-[#FDFBF7] border border-black/5">
              <div>
                <p className="font-poppins text-sm font-medium text-[#03071E]">Available</p>
                <p className="font-poppins text-xs text-[#03071E]/45">
                  Customers can order this right away
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isAvailable}
                onClick={() => setIsAvailable((v) => !v)}
                className={`relative w-12 h-7 rounded-full shrink-0 transition-colors duration-300 ${isAvailable ? "bg-[#E85D04]" : "bg-[#03071E]/15"
                  }`}
              >
                <motion.span
                  className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-sm"
                  animate={{ x: isAvailable ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 32 }}
                />
              </button>
              {/* hidden input mirrors the toggle so the field name survives a plain form submit */}
              <input type="checkbox" name="isAvailable" checked={isAvailable} readOnly hidden />
            </div>

            <div className="mt-6 flex justify-end">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 rounded-full font-poppins font-medium text-sm text-[#FDFBF7] bg-[#E85D04] flex items-center gap-2"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {submitting ? (
                    <motion.span
                      key="spin"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, rotate: 360 }}
                      exit={{ opacity: 0 }}
                      transition={{ rotate: { duration: 0.7, repeat: Infinity, ease: "linear" } }}
                      className="w-4 h-4 border-2 border-[#03071E]/25 border-t-[#03071E] rounded-full"
                    />
                  ) : (
                    <motion.span key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      Upload
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadFood

// foodName, description, price, category, isAvailable, image