import axios from "axios";
import { useEffect, useState } from "react";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { buttonClass } from "../utils/buttonStyles";


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("https://freelance-backend-3.onrender.com/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(res.data.users);
        setGigs(res.data.gigs);
        setReviews(res.data.reviews);
      } catch (err) {
        console.error("Admin fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <NavbarLoggedIn />
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <ul className="list-disc pl-5">
          {users.map((user) => (
            <li key={user._id}>{user.name} - {user.email} ({user.role})</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Gigs</h2>
        <ul className="list-disc pl-5">
          {gigs.map((gig) => (
            <li key={gig._id}>{gig.title} - ₹{gig.price}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        <ul className="list-disc pl-5">
          {reviews.map((review) => (
            <li key={review._id}>
              Rating: {review.rating} - {review.comment}
            </li>
          ))}
        </ul>
      </section>
      <button className={buttonClass}>
  Login
</button>

    </div>
  </>
  );
};

export default AdminDashboard;
