import axios from "axios";
import { useEffect, useState } from "react";
import GigCard from "../components/GigCard";

const ReviewedGigs = () => {
  const [reviewedGigs, setReviewedGigs] = useState([]);

  useEffect(() => {
    const fetchReviewedGigs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://freelance-backend-3.onrender.com/api/reviews/my-reviewed-gigs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReviewedGigs(res.data);
      } catch (err) {
        console.error("Error fetching reviewed gigs:", err);
      }
    };

    fetchReviewedGigs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reviewed Gigs</h1>
      {reviewedGigs.length === 0 ? (
        <p className="text-gray-500">No reviewed gigs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {reviewedGigs.map((gig) => (
            <GigCard key={gig._id} gig={gig} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewedGigs;
