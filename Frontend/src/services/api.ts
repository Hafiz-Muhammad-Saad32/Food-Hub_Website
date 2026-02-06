import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Food API
export const foodAPI = {
  getAllFoods: () => apiClient.get("/foods"),
  getFoodById: (id: string) => apiClient.get(`/foods/getById/${id}`),
  addFood: (foodData: any) => apiClient.post("/foods/add", foodData),
  updateFood: (id: string, foodData: any) => apiClient.patch(`/foods/update/${id}`, foodData),
  deleteFood: (id: string) => apiClient.delete(`/foods/delete/${id}`),
};

// Address API
export const addressAPI = {
  getUserAddresses: () => apiClient.get("/addresses"),
  getAddressById: (id: string) => apiClient.get(`/addresses/${id}`),
  createAddress: (data: any) => apiClient.post("/addresses", data),
  updateAddress: (id: string, data: any) => apiClient.patch(`/addresses/${id}`, data),
  deleteAddress: (id: string) => apiClient.delete(`/addresses/${id}`),
};

// Order API
export const orderAPI = {
  createOrder: (orderData: any) => apiClient.post("/orders", orderData),
  getUserOrders: () => apiClient.get("/orders"),
  getOrderById: (id: string) => apiClient.get(`/orders/${id}`),
  updateOrderStatus: (id: string, status: string) =>
    apiClient.patch(`/orders/${id}/status`, { status }),
  cancelOrder: (id: string) => apiClient.delete(`/orders/${id}`),
  // Address sub-calls for order page
  getUserAddresses: () => addressAPI.getUserAddresses(),
};

export default apiClient;