import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { buttonClass } from "../utils/buttonStyles";


const FreelancerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [gigs, setGigs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGigs = async () => {
      if (!user?.id) return;

      try {
        const res = await axios.get(`https://freelance-backend-3.onrender.com/api/gigs/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setGigs(res.data);
      } catch (err) {
        console.error("Failed to fetch gigs", err);
        setError("Could not load your gigs");
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`https://freelance-backend-3.onrender.com/api/orders/freelancer-orders`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
        setError("Could not load your orders");
      }
    };

    fetchGigs();
    fetchOrders();
  }, [user]);

  return (
    <>
    <div className="min-h-screen bg-gray-100 px-4 sm:px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          👩‍💻 Freelancer Dashboard
        </h1>

        {error && (
          <p className="text-red-600 font-semibold mb-4 text-center">{error}</p>
        )}

        <div className="flex justify-center mb-6">
          <button
            onClick={() => navigate("/create-gig")}
            className={`${buttonClass} text-sm`}
          >
            ➕ Create New Gig
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 🎨 Gigs */}
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <h2 className="text-xl font-bold text-purple-700 mb-4">
              Your Gigs
            </h2>
            {gigs.length === 0 ? (
              <p className="text-gray-600">No gigs created yet.</p>
            ) : (
              <ul className="space-y-4">
                {gigs.map((gig) => (
                  <li
                    key={gig._id}
                    className="border p-4 rounded-lg bg-gray-50 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-blue-700">
                      {gig.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      ₹ {gig.price}
                    </p>
                    <p className="text-sm text-gray-500">{gig.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 📦 Orders */}
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <h2 className="text-xl font-bold text-purple-700 mb-4">
              Orders Received
            </h2>
            {orders.length === 0 ? (
              <p className="text-gray-600">No orders received yet.</p>
            ) : (
              <ul className="space-y-4">
                {orders.map((order) => (
                  <li
                    key={order._id}
                    className="p-4 bg-gray-50 border rounded-lg shadow-sm"
                  >
                    <p className="text-blue-700 font-semibold">
                      Gig: {order.gigId?.title || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Ordered by: {order.clientId?.email || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-500">
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
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default FreelancerDashboard;
