import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// const token = localStorage.getItem("authToken");

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
  getAllFoods: () => apiClient.get("/foods"),

  getFoodById: (id) => apiClient.get(`/foods/getById/${id}`),

  addFood: (foodData) => apiClient.post("/foods/add", foodData),

  updateFood: (id, foodData) =>
    apiClient.patch(`/foods/update/${id}`, foodData),

  deleteFood: (id) => apiClient.delete(`/foods/delete/${id}`),
};

//////////////////////////////////////////////////////
// 📍 ADDRESS API - Saad
//////////////////////////////////////////////////////

// export const addressAPI = {
//   getUserAddresses: () => apiClient.get("/address"),

//   getAddressById: (id) => apiClient.get(`/address/${id}`),

//   createAddress: (data) => apiClient.post("/address", data),

//   updateAddress: (id, data) => apiClient.patch(`/address/${id}`, data),

//   deleteAddress: (id) => apiClient.delete(`/address/${id}`),
// };

//////////////////////////////////////////////////////

export const addressAPI = {
  getUserAddresses: async () => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("User not logged in");

    return await apiClient.get("/address", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getAddressById: (id) => apiClient.get(`/address/${id}`),

  createAddress: async (data) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("User not logged in");

    return await apiClient.post("/address", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // updateAddress: (id, data) => apiClient.patch(`/address/${id}`, data),

  updateAddress: async (id, data) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("User not logged in");

    return await apiClient.patch(`/address/update/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  deleteAddress: async (id) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("User not logged in");

    return await apiClient.delete(`/address/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

//////////////////////////////////////////////////////
// 🧾 ORDER API
//////////////////////////////////////////////////////

export const orderAPI = {
  createOrder: (orderData) => apiClient.post("/orders", orderData),

  getUserOrders: () => apiClient.get("/orders"),

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
// const token = localStorage.getItem("authToken");

export const cartAPI = {
  addToCart: async (foodId, quantity = 1) => {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(token);
    // if (!user) throw new Error("User not logged in");

    if (!token) throw new Error("User not logged in");

    return await apiClient.post(
      "/cart/add",
      { foodId, quantity },
      {
        headers: { Authorization: `Bearer ${token}` }, // <-- important
      },
    );
  },

  getCart: async () => {
    const token = localStorage.getItem("authToken");
    // const user = JSON.parse(localStorage.getItem("user"));
    return await apiClient.get("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  removeFromCart: async (foodId) => {
    const token = localStorage.getItem("authToken");
    return await apiClient.delete(`/cart/remove/${foodId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  updateCartQuantity: async (foodId, quantity) => {
    const token = localStorage.getItem("authToken");
    return await apiClient.put(
      `/cart/update/${foodId}`,
      { quantity },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  },

  clearCart: async () => {
    const token = localStorage.getItem("authToken");
    return await apiClient.delete("/cart/clear", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
