import axios from "axios";
import { useEffect, useState } from "react";
import { buttonClass } from "../utils/buttonStyles";

const GigList = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/gigs");
        setGigs(res.data);
      } catch (err) {
        console.error("Failed to fetch gigs", err);
      }
    };

    fetchGigs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-12">
        🔥 Featured Gigs
      </h2>

      {gigs.length === 0 ? (
        <p className="text-center text-gray-600">No gigs found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gigs.map((gig) => (
            <div
                key={gig._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >

              {gig.image ? (
                <img
                  src={`https://freelance-backend-3.onrender.com/uploads/${gig.image}`}
                  alt={gig.title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 rounded-t-2xl">
                  No Image
                </div>
              )}

              <div className="p-5 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{gig.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {gig.description}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-purple-600 font-bold text-lg">
                    ₹{gig.price}
                  </span>
                  <button className={`${buttonClass} text-sm px-4 py-2`}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GigList;
