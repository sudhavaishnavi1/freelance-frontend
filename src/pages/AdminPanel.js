import axios from "axios";
import { useEffect, useState } from "react";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [usersRes, gigsRes] = await Promise.all([
          axios.get("https://freelance-backend-3.onrender.com/api/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://freelance-backend-3.onrender.com/api/admin/gigs", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUsers(usersRes.data);
        setGigs(gigsRes.data);
      } catch (err) {
        setError("Failed to load admin data.");
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">
          Admin Panel
        </h1>

        {error && (
          <p className="text-center text-red-600 font-medium mb-6">{error}</p>
        )}

        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Registered Users
          </h2>
          <div className="overflow-auto bg-white rounded-2xl shadow-md">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-blue-100 text-gray-700 font-semibold">
                <tr>
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 capitalize">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            All Gigs
          </h2>
          <div className="overflow-auto bg-white rounded-2xl shadow-md">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-blue-100 text-gray-700 font-semibold">
                <tr>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Freelancer</th>
                </tr>
              </thead>
              <tbody>
                {gigs.map((gig) => (
                  <tr key={gig._id} className="border-t">
                    <td className="px-4 py-2">{gig.title}</td>
                    <td className="px-4 py-2 capitalize">{gig.category}</td>
                    <td className="px-4 py-2">₹{gig.price}</td>
                    <td className="px-4 py-2">{gig.freelancerUsername}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
