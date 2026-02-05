import Order from "./orders.model";

export const createOrder = (data: any) => {
  return Order.create(data);
};

export const getAllOrders = () => {
  return Order.find({ deletedAt: null })
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
    { new: true }
  );
};

export const softDeleteOrder = (id: string) => {
  return Order.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true }
  );
};