import axios from "axios";

const CheckoutButton = ({ gigId }) => {
  const handleCheckout = async () => {
    console.log("Checkout button received gigId:", gigId);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to make a purchase.");
        return;
      }

      const res = await axios.post(
        "https://freelance-backend-3.onrender.com/api/stripe/create-checkout-session",
        { gigId }, // ✅ Pass gigId directly
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.href = res.data.url;

    } catch (err) {
      console.error("Checkout error:", err.response?.data || err.message);
      alert("Checkout failed.");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
    >
      Purchase
    </button>
  );
};

export default CheckoutButton;
