import axios from "axios";
import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 sm:px-8 py-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-600">My Orders</h2>

      {orders.length > 0 ? (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700">{order.gig?.title || "Untitled Gig"}</h3>
              <p className="text-gray-700">{order.gig?.description}</p>
              <p className="text-green-600 font-bold mt-1">₹{order.gig?.price}</p>
              <p className="text-sm text-gray-500">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
