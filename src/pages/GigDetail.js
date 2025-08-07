import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GigDetail = () => {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGigAndReviews = async () => {
      try {
        const [gigRes, reviewRes] = await Promise.all([
          axios.get(`https://freelance-backend-3.onrender.com/api/gigs/${id}`),
          axios.get(`https://freelance-backend-3.onrender.com/api/reviews/${id}`),
        ]);
        setGig(gigRes.data);
        setReviews(reviewRes.data);
      } catch (err) {
        console.error("Error loading gig or reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGigAndReviews();
  }, [id]);

  if (loading) return <p className="p-4 text-gray-600">Loading...</p>;
  if (!gig) return <p className="p-4 text-red-500">Gig not found.</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{gig.title}</h1>
      <img
        src={`https://freelance-backend-3.onrender.com/uploads/${gig.image}`}
        alt={gig.title}
        className="w-full max-w-md mb-4 rounded shadow"
      />
      <p className="text-gray-700 mb-2">{gig.description}</p>
      <p className="text-purple-600 font-semibold mb-4">₹{gig.price}</p>

      <h2 className="text-xl font-bold mt-6 mb-2">Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="border p-3 rounded mb-3 bg-gray-100 shadow-sm"
          >
            <p className="font-semibold text-purple-700">
              {review.clientId?.email || "Anonymous"} rated {review.rating}/5
            </p>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default GigDetail;
