import { useState, useEffect } from "react";
import { foodData } from "../data/foodData";

export default function FoodForm({ foods, setFoods }) {
  const [localFoods, setLocalFoods] = useState(foodData);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "popular",
    image: "",
    description: "",
    rating: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Update global state when local foods change
  useEffect(() => {
    setFoods(localFoods);
  }, [localFoods, setFoods]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "rating" ? parseFloat(value) : value,
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Food name is required";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.rating || formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = "Rating must be between 0 and 5";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // TODO: BACKEND API CALL HERE
    // For ADD:
    // const response = await fetch("/api/foods", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData)
    // });

    // For UPDATE:
    // const response = await fetch(`/api/foods/${editingId}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData)
    // });

    setTimeout(() => {
      if (editingId) {
        // Update existing food
        setLocalFoods(
          localFoods.map((food) =>
            food.id === editingId ? { ...food, ...formData } : food
          )
        );
        setSuccessMessage("✓ Food updated successfully!");
      } else {
        // Add new food
        const newFood = {
          id: Math.max(...localFoods.map((f) => f.id), 0) + 1,
          ...formData,
        };
        setLocalFoods([...localFoods, newFood]);
        setSuccessMessage("✓ Food added successfully!");
      }

      resetForm();
      setLoading(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1500);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "popular",
      image: "",
      description: "",
      rating: "",
    });
    setErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  // Edit food
  const handleEdit = (food) => {
    setFormData(food);
    setEditingId(food.id);
    setShowForm(true);
  };

  // Delete food
  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this food item?")
    ) {
      return;
    }

    // TODO: BACKEND API CALL HERE
    // const response = await fetch(`/api/foods/${id}`, {
    //   method: "DELETE"
    // });

    setLocalFoods(localFoods.filter((food) => food.id !== id));
    setSuccessMessage("✓ Food deleted successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Filter foods based on search
  const filteredFoods = localFoods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-dark">🍴 Admin Panel</h1>
            <p className="text-gray-600 mt-2">Manage your food menu</p>
          </div>
          <button
            onClick={() => (showForm ? resetForm() : setShowForm(true))}
            className={`${
              showForm ? "btn-outline" : "btn-primary"
            }`}
          >
            {showForm ? "Cancel" : "+ Add New Food"}
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-100 border-2 border-green-400 text-green-700 px-6 py-4 rounded-lg animate-slideDown">
            {successMessage}
          </div>
        )}

        {/* Add/Edit Food Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-card p-8 mb-12 animate-slideDown">
            <h2 className="text-2xl font-bold text-dark mb-6">
              {editingId ? "✏️ Edit Food" : "➕ Add New Food"}
            </h2>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Food Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Margherita Pizza"
                  className={`input-field ${
                    errors.name ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="12.99"
                  step="0.01"
                  className={`input-field ${
                    errors.price ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="popular">Popular</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                  <option value="drinks">Drinks</option>
                  <option value="others">Others</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Rating (0-5) *
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="4.5"
                  min="0"
                  max="5"
                  step="0.1"
                  className={`input-field ${
                    errors.rating ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                {errors.rating && (
                  <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
                )}
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-dark mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className={`input-field ${
                    errors.image ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-dark mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your food..."
                  rows={3}
                  className={`input-field resize-none ${
                    errors.description
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-dark mb-2">
                    Image Preview
                  </p>
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150?text=Invalid+URL";
                    }}
                  />
                </div>
              )}

              {/* Submit Button */}
              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Processing..."
                    : editingId
                    ? "Update Food"
                    : "Add Food"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Foods List */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark">
              📋 Food Items ({filteredFoods.length})
            </h2>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search foods..."
              className="input-field max-w-xs"
            />
          </div>

          {filteredFoods.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-dark">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-dark">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-dark">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-dark">
                      Rating
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-dark">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFoods.map((food) => (
                    <tr
                      key={food.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300 animate-fadeIn"
                    >
                      <td className="px-4 py-3">
                        <div className="flex gap-3 items-center">
                          <img
                            src={food.image}
                            alt={food.name}
                            className="w-12 h-12 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/50?text=No+Image";
                            }}
                          />
                          <div>
                            <p className="font-bold text-dark">
                              {food.name}
                            </p>
                            <p className="text-gray-600 text-sm line-clamp-1">
                              {food.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                          {food.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-primary">
                          ${food.price.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1">
                          ⭐ {food.rating}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(food)}
                            className="text-blue-500 hover:text-blue-700 font-medium transition-colors duration-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(food.id)}
                            className="text-red-500 hover:text-red-700 font-medium transition-colors duration-300"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-2xl mb-4">😔</p>
              <p className="text-gray-600">No foods found matching your search</p>
            </div>
          )}
        </div>

        {/* Admin Notes */}
        <div className="mt-12 bg-blue-100 border-2 border-blue-400 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-3">💡 Admin Notes:</h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>
              ✅ All operations (ADD, UPDATE, DELETE, VIEW) are fully
              functional on the frontend using local state
            </li>
            <li>
              🔌 Backend API endpoints need to be connected in the commented
              sections above
            </li>
            <li>✏️ Edit foods by clicking the "Edit" button in the table</li>
            <li>🗑️ Delete foods by clicking the "Delete" button</li>
            <li>
              🔍 Search through foods using the search input at the top
            </li>
            <li>
              💾 All data is stored locally (will reset on page refresh - use
              backend for persistence)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
