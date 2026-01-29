import { useState } from "react";

export default function FoodCard({ food, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(food);
    setIsAdded(true);
    // Reset after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="card overflow-hidden group h-full flex flex-col">
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 bg-gray-200">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
          {food.category}
        </div>
        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-yellow-400 text-dark px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          ⭐ {food.rating}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-bold text-dark mb-1 line-clamp-2">
          {food.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
          {food.description}
        </p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-primary">
            ${food.price.toFixed(2)}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
              isAdded
                ? "bg-green-500 text-white"
                : "btn-primary"
            }`}
          >
            {isAdded ? "✓ Added" : "🛒 Add"}
          </button>
          <button className="flex-1 btn-outline">Order Now</button>
        </div>
      </div>
    </div>
  );
}
