import { useState, useEffect } from "react";
import { orderAPI, addressAPI } from "../services/api";

export default function AddressManager({ onAddressSelect, selectedAddressId }) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    city: "",
    street: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);

  // Fetch addresses on mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await addressAPI.getUserAddresses();
      setAddresses(response.data.data || []);
    } catch (err) {
      console.error("Error fetching addresses:", err);
      alert("❌ Error loading addresses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.street.trim()) newErrors.street = "Street/Address is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Phone must be at least 10 digits";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("❌ Please fill in all required fields correctly.");
      return;
    }

    setSubmitLoading(true);
    try {
      if (editingId) {
        // Update
        await addressAPI.updateAddress(editingId, formData);
        alert("✅ Address updated successfully!");
      } else {
        // Create
        await addressAPI.createAddress(formData);
        alert("✅ Address added successfully!");
      }
      resetForm();
      fetchAddresses();
    } catch (err) {
      console.error("Error saving address:", err);
      alert(
        `❌ Error: ${err.response?.data?.message || "Failed to save address"}`
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (address) => {
    setEditingId(address._id);
    setFormData({
      city: address.city,
      street: address.street,
      phone: address.phone,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await addressAPI.deleteAddress(id);
        alert("✅ Address deleted successfully!");
        fetchAddresses();
      } catch (err) {
        console.error("Error deleting address:", err);
        alert(
          `❌ Error: ${err.response?.data?.message || "Failed to delete address"}`
        );
      }
    }
  };

  const handleSelectAddress = (address) => {
    onAddressSelect(address._id, address);
  };

  const resetForm = () => {
    setFormData({ city: "", street: "", phone: "" });
    setErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading addresses...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Add/Edit Form Toggle */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full btn-primary text-sm py-2"
      >
        {showForm ? "Cancel" : `${editingId ? "Update" : "Add New"} Address`}
      </button>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg border-2 border-gray-200 space-y-3">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              City *
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Enter city"
              className="input-field w-full"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Street Address *
            </label>
            <input
              type="text"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              placeholder="Enter street address"
              className="input-field w-full"
            />
            {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Phone *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
              className="input-field w-full"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <button
            type="submit"
            disabled={submitLoading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed py-2"
          >
            {submitLoading ? "Saving..." : editingId ? "Update Address" : "Save Address"}
          </button>
        </form>
      )}

      {/* Addresses List */}
      {addresses.length === 0 ? (
        <p className="text-gray-600 text-center py-4">No addresses yet. Add one!</p>
      ) : (
        <div className="space-y-2">
          {addresses.map((address) => (
            <div
              key={address._id}
              onClick={() => handleSelectAddress(address)}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                selectedAddressId === address._id
                  ? "border-primary bg-blue-50"
                  : "border-gray-200 bg-white hover:border-primary"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-dark">
                    📍 {address.street}, {address.city}
                  </p>
                  <p className="text-sm text-gray-600">📱 {address.phone}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(address);
                    }}
                    className="text-blue-500 hover:text-blue-700 font-medium text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(address._id);
                    }}
                    className="text-red-500 hover:text-red-700 font-medium text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}