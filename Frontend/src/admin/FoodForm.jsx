import { useState, useEffect } from "react";
import { foodAPI } from "../services/api";
import {useToast} from "../context/ToastContext"

import {
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  Image as ImageIcon,
  Star,
  Tag,
  DollarSign,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function FoodForm({ setFoods }) {
  const showToast = useToast()
  const [localFoods, setLocalFoods] = useState([]);
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
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      setPageLoading(true);
      const response = await foodAPI.getAllFoods();
      const foods = response.data.data || [];
      setLocalFoods(foods);
      setFoods(foods);
    } catch (err) {
      console.error("Error fetching foods:", err);
      showStatus("❌ Error loading foods", "error");
    } finally {
      setPageLoading(false);
    }
  };

  const showStatus = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "rating"
          ? value === ""
            ? ""
            : parseFloat(value)
          : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await foodAPI.updateFood(editingId, formData);
        // showStatus("✓ Item updated successfully");
        showToast("Item updated successfully","success");
      } else {
        const response = await foodAPI.addFood(formData);
        setLocalFoods([...localFoods, response.data.data]);
        // showStatus("✓ New item added to menu");
        showToast("New item added to menu","succes");
      }
      fetchFoods(); // Refresh list
      resetForm();
    } catch (err) {
      const data = err?.response?.data || "nothing";

      // console.log(data.error);

      // 🟥 ZOD ERRORS
      if (data?.error) {
        const fieldErrors = {};

        data.error.forEach((err) => {
          const fieldName = err.path[0]; // email, password etc
          fieldErrors[fieldName] = err.message;
        });

        setErrors(fieldErrors);
        // console.log(errors);

        setServerError("");
        // console.log(errors);
      }

      // 🟥 SERVER ERROR
      else if (data?.message) {
        setServerError(data.message);
        setErrors({});
      }
      // showStatus("❌ " + (err.response?.data?.message || "Operation failed"));
    } finally {
      setLoading(false);
    }
  };

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

  const handleEdit = (food) => {
    setFormData({
      name: food.name,
      price: food.price,
      category: food.category,
      image: food.image,
      description: food.description,
      rating: food.rating || 0,
    });
    setEditingId(food._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanent delete this item?")) return;
    try {
      await foodAPI.deleteFood(id);
      setLocalFoods(localFoods.filter((f) => f._id !== id));
      showStatus("✓ Item removed from menu");
    } catch (err) {
      showStatus("❌ Failed to delete");
    }
  };

  const filteredFoods = localFoods.filter((food) =>
    food.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">
              Menu{" "}
              <span className="text-orange-500 not-italic">Inventory.</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
              Add, edit, or remove catalog items
            </p>
          </div>
          <button
            onClick={() => (showForm ? resetForm() : setShowForm(true))}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
              showForm
                ? "bg-slate-200 text-slate-600"
                : "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
            }`}
          >
            {showForm ? <X size={14} /> : <Plus size={14} />}
            {showForm ? "Close Form" : "Create New Item"}
          </button>
        </div>

        {/* NOTIFICATIONS */}
        {successMessage && (
          <div
            className={`mb-8 flex items-center gap-3 px-6 py-4 rounded-[2rem] border animate-fadeIn ${
              successMessage.includes("✓")
                ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                : "bg-rose-50 border-rose-100 text-rose-700"
            }`}
          >
            {successMessage.includes("✓") ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span className="text-xs font-black uppercase tracking-widest">
              {successMessage}
            </span>
          </div>
        )}

        {/* ADD/EDIT FORM */}
        {showForm && (
          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 md:p-12 mb-12 animate-slideDown">
            <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">
              {editingId ? "Edit Menu Item" : "Create Menu Item"}
            </h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                {/* Inputs */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                    Item Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-bold text-slate-700"
                    placeholder="e.g. Truffle Pizza"
                  />
                  {errors.name && (
                    <p className="text-rose-500 text-[10px] font-bold ml-2">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-bold text-slate-700"
                    placeholder="19.99"
                  />
                  {errors.price && (
                    <p className="text-rose-500 text-[10px] font-bold ml-2">
                      {errors.price}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl outline-none font-bold text-slate-700"
                  >
                    <option value="popular">Popular</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="non-vegetarian">Non-Vegetarian</option>
                    <option value="drinks">Drinks</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl outline-none font-bold text-slate-700"
                    placeholder="4.8"
                  />
                  {errors.rating && (
                    <p className="text-rose-500 text-[10px] font-bold ml-2">
                      {errors.rating}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl outline-none font-medium text-slate-600 resize-none"
                    placeholder="Describe the ingredients and flavor profile..."
                  />
                  {errors.description && (
                    <p className="text-rose-500 text-[10px] font-bold ml-2">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                    Image URL
                  </label>
                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl outline-none font-medium text-slate-600"
                    placeholder="https://unsplash.com/..."
                  />
                  {errors.image && (
                    <p className="text-rose-500 text-[10px] font-bold ml-2">
                      {errors.image}
                    </p>
                  )}
                </div>
              </div>

              {/* Preview Sidebar */}
              <div className="bg-slate-50 rounded-[2.5rem] p-6 border border-slate-100 flex flex-col items-center justify-center text-center">
                {formData.image ? (
                  <img
                    src={formData.image}
                    className="w-full aspect-square object-cover rounded-[2rem] mb-4 shadow-lg shadow-slate-200"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/300?text=Invalid+Image")
                    }
                  />
                ) : (
                  <div className="w-full aspect-square bg-slate-200 rounded-[2rem] mb-4 flex items-center justify-center text-slate-400">
                    <ImageIcon size={48} strokeWidth={1} />
                  </div>
                )}
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Live Preview
                </p>
                <h3 className="font-bold text-slate-900 mt-2">
                  {formData.name || "Item Name"}
                </h3>
              </div>

              <div className="md:col-span-3 flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin mx-auto" />
                  ) : editingId ? (
                    "Save Changes"
                  ) : (
                    "Publish to Menu"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* LIST SECTION */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              Catalog{" "}
              <span className="text-slate-300 font-medium">
                ({filteredFoods.length})
              </span>
            </h2>
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 pl-12 pr-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                placeholder="Search item..."
              />
            </div>
          </div>

          {pageLoading ? (
            <div className="py-20 flex justify-center">
              <Loader2 className="animate-spin text-orange-500" size={32} />
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredFoods.map((food) => (
                <div
                  key={food._id}
                  className="group flex flex-col md:flex-row items-center justify-between p-4 bg-white border border-slate-50 rounded-[2rem] hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all"
                >
                  <div className="flex items-center gap-6 w-full">
                    <img
                      src={food.image}
                      className="w-20 h-20 object-cover rounded-2xl"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-black text-slate-900">
                          {food.name}
                        </h4>
                        <span className="bg-slate-100 text-slate-500 px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter italic">
                          {food.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 max-w-md">
                        {food.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-orange-500 font-black text-xs">
                          <DollarSign size={12} /> {food.price.toFixed(2)}
                        </div>
                        <div className="flex items-center gap-1 text-slate-400 font-bold text-[10px]">
                          <Star
                            size={12}
                            className="text-amber-400 fill-amber-400"
                          />{" "}
                          {food.rating || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button
                      onClick={() => handleEdit(food)}
                      className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-50 hover:text-blue-500 transition-all"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-xl hover:bg-rose-50 hover:text-rose-500 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
