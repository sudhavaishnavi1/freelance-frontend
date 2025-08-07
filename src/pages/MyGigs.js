import axios from "axios";
import { useEffect, useState } from "react";
import { buttonClass } from "../utils/buttonStyles";


const MyGigs = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const fetchUserGigs = async () => {
      try {
        const res = await axios.get(
          "https://freelance-backend-3.onrender.com/api/gigs/user/6873cc6e295dc17082c0dbbd",
          {
            headers: {
              Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzNjYzZlMjk1ZGMxNzA4MmMwZGJiZCIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE3NTI2ODQxMzUsImV4cCI6MTc1Mjc3MDUzNX0.eF_U1NVcU910w3_AEd4QUz6sP15wvf5ifkuKBa04H68", // Replace with your real token
            },
          }
        );
        setGigs(res.data);
      } catch (err) {
        console.error("Failed to fetch user gigs", err);
      }
    };

    fetchUserGigs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-purple-600 mb-4">My Gigs</h2>
      {gigs.length > 0 ? (
        gigs.map((gig) => (
          <div key={gig._id} className="border rounded p-4 mb-4 shadow">
            <h3 className="text-lg font-semibold">{gig.title}</h3>
            <p>{gig.description}</p>
            <p className="text-purple-600 font-bold">₹{gig.price}</p>
          </div>
        ))
      ) : (
        <p>No gigs created yet.</p>
      )}
      <button className={buttonClass}>
  Login
</button>

    </div>
  );
};

export default MyGigs;
