// src/pages/MyOrders.js
import axios from "axios";
import { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      const res = await axios.get("https://freelance-backend-3.onrender.com/api/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching client orders:", err);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <div key={order._id} className="border rounded p-4 bg-white shadow">
              <h3 className="text-lg font-bold">{order.gigId.title}</h3>
              <p className="text-gray-600">{order.gigId.description}</p>
              <p>Price: ₹{order.gigId.price}</p>
              <p>Status: {order.status}</p>

              {/* ✅ Show download link if delivery is available */}
              {order.status === "delivered" && order.deliveryFile && (
                <a
                  href={`https://freelance-backend-3.onrender.com/uploads/${order.deliveryFile}`}
                  download
                  className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Download Delivery
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
