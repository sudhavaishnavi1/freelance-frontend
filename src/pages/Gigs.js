import axios from "axios";
import { useEffect, useState } from "react";
import GigCard from "../components/GigCard";


const Gigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await axios.get("https://freelance-backend-3.onrender.com/api/gigs");
        setGigs(res.data);
      } catch (err) {
        console.error("Error fetching gigs:", err);
        setError("Failed to fetch gigs.");
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading gigs...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Available Gigs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gigs.map((gig) => (
          <GigCard key={gig._id} gig={gig} />
        ))}
      </div>
    </div>
  );
};

export default Gigs;

