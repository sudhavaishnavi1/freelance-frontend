import axios from "axios";
import { useEffect, useState } from "react";

const FreelancerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://freelance-backend-3.onrender.com/api/orders/freelancer-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const handleDelivery = async (orderId, file) => {
    try {
      const formData = new FormData();
      formData.append("deliveryFile", file);

      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/orders/mark-delivered/${orderId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Refresh orders
      const updatedOrders = await axios.get("http://localhost:5000/api/orders/freelancer-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(updatedOrders.data);
    } catch (err) {
      console.error("Error delivering file:", err);
      alert("Failed to mark as delivered.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Orders Received</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 mb-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">{order.gigId?.title}</h3>
            <p className="text-gray-600">Client: {order.clientId?.email}</p>
            <p className="text-gray-600">Price: ₹{order.gigId?.price}</p>
            <p>Status: <span className="font-semibold">{order.status}</span></p>

            {order.status === "delivered" ? (
              <>
                <p className="text-green-600 font-semibold mt-2">Delivered</p>
                {/* ✅ Download link for delivered file */}
                {order.deliveryFile && (
                  <a
                    href={`http://localhost:5000/api/orders/delivery/${order._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Download Delivered File
                  </a>
                )}
              </>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const file = e.target.elements.deliveryFile.files[0];
                  handleDelivery(order._id, file);
                }}
                className="mt-2"
              >
                <input type="file" name="deliveryFile" required />
                <button
                  type="submit"
                  className="ml-2 px-4 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Mark as Delivered
                </button>
              </form>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default FreelancerOrders;
