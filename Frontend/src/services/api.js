import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach JWT token automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Global error handler
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data);
    console.error("API Message:", error.message);
    return Promise.reject(error);
  },
);

//////////////////////////////////////////////////////
// 🍔 FOOD API
//////////////////////////////////////////////////////

export const foodAPI = {
  // getAllFoods: () => apiClient.get("/foods"),
  // getAllFoods: async (page = 1, limit = 6) => {
  //   return apiClient.get(`/foods?page=${page}&limit=${limit}`);
  // },

  getAllFoods: async (page = 1, limit = 6, selectedCategory = "all") => {
    return apiClient.get(
      `/foods?page=${page}&limit=${limit}&selectedCategory=${selectedCategory}`,
    );
  },

  getFoodById: (id) => apiClient.get(`/foods/${id}`),

  addFood: (foodData) => apiClient.post("/foods/add", foodData),

  updateFood: (id, foodData) =>
    apiClient.patch(`/foods/update/${id}`, foodData),

  deleteFood: (id) => apiClient.delete(`/foods/delete/${id}`),
};

///////////////////////////////////////

export const addressAPI = {
  getUserAddresses: () => apiClient.get("/address"),

  getAddressById: (id) => apiClient.get(`/address/${id}`),

  createAddress: (data) => apiClient.post("/address", data),

  updateAddress: (id, data) => apiClient.patch(`/address/update/${id}`, data),
  deleteAddress: (id) => apiClient.delete(`/address/delete/${id}`),
};

//////////////////////////////////////////////////////
// 🧾 ORDER API
//////////////////////////////////////////////////////

export const orderAPI = {
  createOrder: (orderData) => apiClient.post("/orders", orderData),

  // getUserOrders: () => apiClient.get("/orders"),
  getUserOrders: (status) => {
    return apiClient.get("/orders", {
      params: status ? { status } : {},
    });
  },

  getOrderById: (id) => apiClient.get(`/orders/${id}`),

  updateOrderStatus: (id, status) =>
    apiClient.patch(`/orders/${id}/status`, { status }),

  cancelOrder: (id) => apiClient.delete(`/orders/${id}`),

  // reuse address call
  getUserAddresses: () => addressAPI.getUserAddresses(),
};

//////////////////////////////////////////////////////
// 🛒 CART API
//////////////////////////////////////////////////////

export const cartAPI = {
  addToCart: (foodId, quantity = 1) =>
    apiClient.post("/cart/add", { foodId, quantity }),

  getCart: () => apiClient.get("/cart"),

  removeFromCart: (foodId) => apiClient.delete(`/cart/remove/${foodId}`),

  updateCartQuantity: (foodId, quantity) =>
    apiClient.put(`/cart/update/${foodId}`, { quantity }),

  clearCart: () => apiClient.delete("/cart/clear"),
};

//////////////////////////////////////////////////////
// Users API
//////////////////////////////////////////////////////

// services/api.ts
export const userAPI = {
  getAllUsers: () => apiClient.get("/users"),
  deleteUser: (id) => apiClient.delete(`/users/delete/${id}`),
  verifyEmail: (token) => apiClient.get(`/auth/verify-email/${token}`),
};
