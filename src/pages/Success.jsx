import axios from "axios";
import { useEffect } from "react";

const Success = () => {
  useEffect(() => {
    const storeOrder = async () => {
      const gigId = localStorage.getItem("purchasedGigId");
      const token = localStorage.getItem("token");

      if (!gigId || !token) {
        console.log("Missing gigId or token");
        return;
      }

      try {
        const response = await axios.post(
          "https://freelance-backend-3.onrender.com/api/orders",
          { gigId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("✅ Order stored:", response.data);
        localStorage.removeItem("purchasedGigId");
      } catch (err) {
        console.error("❌ Failed to store order:", err);
      }
    };

    storeOrder();
  }, []);

  return (
    <div className="text-center mt-20">
      <h2 className="text-3xl font-bold text-purple-600">🎉 Payment Successful!</h2>
      <p className="mt-4 text-lg">Thank you for your order.</p>
    </div>
  );
};

export default Success;
