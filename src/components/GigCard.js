import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { buttonClass } from "../utils/buttonStyles";

const GigCard = ({ gig }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleBuyNow = async () => {
    if (!user) {
      alert("Please log in to place an order.");
      return navigate("/login");
    }

    // Store gig ID and token locally (optional use)
    localStorage.setItem("purchasedGigId", gig._id);
    localStorage.setItem("token", user.token);

    try {
      const token = user.token || localStorage.getItem("token");

      if (!token) {
        alert("Authorization token missing. Please log in again.");
        return navigate("/login");
      }

      const res = await fetch("https://freelance-backend-3.onrender.com/api/orders/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          gigId: gig._id,
          freelancerId: gig.user?._id,
          clientId: user._id,
          price: gig.price,
          title: gig.title,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Stripe session creation failed");
        return;
      }

      // ✅ Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (err) {
      console.error("Stripe checkout error:", err);
      alert("Something went wrong during checkout.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-4 max-w-md w-full mx-auto">
      <h2 className="text-xl font-semibold mb-2">{gig.title}</h2>
      <p className="text-gray-600 mb-2">{gig.description}</p>
      <p className="text-green-600 font-semibold mb-4">₹{gig.price}</p>

      {user?.role === "client" && (
        <button onClick={handleBuyNow} className={buttonClass}>
          Buy Now
        </button>
      )}
    </div>
  );
};

export default GigCard;
