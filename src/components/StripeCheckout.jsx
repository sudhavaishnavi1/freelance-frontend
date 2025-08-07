import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Replace with your real Stripe publishable key
const stripePromise = loadStripe("pk_test_Your_Public_Key_Here");

const StripeCheckout = ({ gigId, amount }) => {
  const handleClick = async () => {
    try {
      const stripe = await stripePromise;

      // Call backend to create payment intent
      const res = await axios.post("http://localhost:5000/api/stripe/create-payment-intent", {
        amount,
      });

      const result = await stripe.redirectToCheckout({
        sessionId: res.data.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (err) {
      console.error("❌ Stripe error:", err);
      alert("Payment failed");
    }
  };

  return (
    <button
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      onClick={handleClick}
    >
      Pay ₹{amount}
    </button>
  );
};

export default StripeCheckout;
