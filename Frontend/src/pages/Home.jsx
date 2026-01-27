import { useState, useMemo } from "react";
import FoodCard from "../components/FoodCard";
import SearchBar from "../components/SearchBar";
import { foodData, categories } from "../data/foodData";

export default function Home({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("popular");

  // Filter foods based on search and category
  const filteredFoods = useMemo(() => {
    return foodData.filter((food) => {
      const matchesSearch = food.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        food.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || food.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            🍽️ Welcome to FoodHub
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Delicious food delivered fast, fresh, and hot!
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12">
        <div className="container-custom">
          <SearchBar onSearch={setSearchTerm} />
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="py-8 bg-white shadow-card">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-dark mb-6">Browse Categories</h2>
          <div className="flex flex-wrap gap-3 md:gap-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-200 text-dark hover:bg-gray-300"
              }`}
            >
              All Items
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-200 text-dark hover:bg-gray-300"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Foods Grid Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title">
            {searchTerm ? "Search Results" : "Our Menu"}
          </h2>

          {filteredFoods.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFoods.map((food) => (
                <div
                  key={food.id}
                  className="animate-fadeIn"
                  style={{
                    animation: `fadeIn 0.5s ease-out ${
                      filteredFoods.indexOf(food) * 0.05
                    }s both`,
                  }}
                >
                  <FoodCard food={food} onAddToCart={addToCart} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">😔</p>
              <h3 className="text-2xl font-bold text-dark mb-2">
                No Foods Found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="btn-primary mt-6"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="bg-gradient-to-r from-secondary to-primary text-white py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Special Offer!
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Get 20% off on your first order with code: FOODHUB20
              </p>
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                Copy Code
              </button>
            </div>
            <div className="text-6xl text-center">🎉</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-6 text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-dark mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your food delivered hot and fresh within 30 minutes!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-6 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-dark mb-2">
                Quality Assured
              </h3>
              <p className="text-gray-600">
                Every dish is prepared with the finest ingredients
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-6 text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-dark mb-2">
                Best Prices
              </h3>
              <p className="text-gray-600">
                Enjoy discounts and special offers on bulk orders
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
