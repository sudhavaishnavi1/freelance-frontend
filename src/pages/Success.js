import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const gigId = localStorage.getItem("purchasedGigId");
    const token = localStorage.getItem("token");

    const placeOrder = async () => {
      try {
        if (!gigId || !token) {
          console.warn("❌ gigId or token missing in localStorage");
          return;
        }

        console.log("📦 Placing order for gigId:", gigId);

        const res = await axios.post(
          "https://freelance-backend-3.onrender.com/api/orders/place",
          { gigId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("✅ Order placed successfully:", res.data);

        // Clean up localStorage
        localStorage.removeItem("purchasedGigId");

        // Redirect after short delay
        setTimeout(() => {
          console.log("🔁 Redirecting to /client-dashboard...");
          navigate("/client-dashboard"); // ✅ change to your dashboard route
        }, 3000);
      } catch (err) {
        console.error("❌ Order placement failed:", err.response?.data || err.message);
      }
    };

    placeOrder();
  }, [navigate]);

  return (
    <div className="text-center mt-10">
      <h2 className="text-3xl font-bold text-green-600">Payment Successful!</h2>
      <p className="mt-4">Redirecting to your orders...</p>
    </div>
  );
};

export default Success;
