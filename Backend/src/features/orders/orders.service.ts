import Order from "./orders.model";

// export const createOrder = (data: any) => {
//   return Order.create(data);
// };

export const createOrder = async (data: any) => {
  const order = await Order.create(data);

  // populate food inside items
  await order.populate("items.food");

  return order;
};

// export const getAllOrders = () => {
//   return Order.find({ deletedAt: null })
//     .populate("user")
//     .populate("items.food")
//     .populate("address");
// };

type OrderFilter = {
  status?: "pending" | "preparing" | "completed" | "cancelled";
};

export const getAllOrders = async (filter: OrderFilter = {}) => {
  return Order.find({ deletedAt: null, ...filter })
    .populate("user")
    .populate("items.food")
    .populate("address");
};

export const getOrderById = (id: string) => {
  return Order.findOne({ _id: id, deletedAt: null })
    .populate("user")
    .populate("items.food")
    .populate("address");
};

export const updateOrderStatus = (id: string, status: string) => {
  return Order.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  );
};

export const softDeleteOrder = (id: string) => {
  return Order.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
};
