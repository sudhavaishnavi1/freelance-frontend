import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { buttonClass } from "../utils/buttonStyles";

const ClientDashboard = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders/client", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        const data = await res.json();
        const validOrders = data.filter(
          (order) => order.gigId && typeof order.gigId === "object"
        );
        setOrders(validOrders);

        if (!res.ok) {
          console.error("Failed to fetch orders:", data.message);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    if (user?.role === "client") {
      fetchOrders();
    }
  }, [user]);

  return (
    <>
    <div className="min-h-screen bg-gray-100 px-4 sm:px-8 py-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        🧾 Your Orders
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => navigate("/gigs")}
          className={`${buttonClass} text-sm`}
        >
          🔍 Browse More Gigs
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold text-purple-700 mb-2">
                {order.gigId?.title || "Deleted Gig"}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                Freelancer:{" "}
                <span className="font-medium">
                  {order.freelancerId?.username || "Unknown"}
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Price: ₹{order.gigId?.price || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                Status:{" "}
                <span
                  className={
                    order.delivered
                      ? "text-green-600 font-semibold"
                      : "text-yellow-500 font-semibold"
                  }
                >
                  {order.delivered ? "Delivered" : "Pending"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
  );
};

export default ClientDashboard;
