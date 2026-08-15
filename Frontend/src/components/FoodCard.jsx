
const FoodCard = ({ image, foodName, description, price }) => {
  return (
    <div className="w-full aspect-[3/4] bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      {/* Image takes a fixed share of the card's height so text area stays consistent */}
      <div className="w-full h-[40%] bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={foodName}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center gap-1 p-2 sm:p-3 overflow-hidden">
        <h3 className="text-[11px] sm:text-sm md:text-base font-semibold text-gray-900 leading-tight line-clamp-2">
          {foodName}
        </h3>
        <p className="text-[9px] sm:text-xs text-gray-500 leading-snug line-clamp-2">
          {description}
        </p>
      </div>

      <div className="pb-2 sm:pb-3 pt-1 border-t border-gray-100 text-center">
        <span className="text-[11px] sm:text-sm font-bold text-emerald-600">
          ₹{price}
        </span>
      </div>
    </div>
  );
}


export default FoodCard;