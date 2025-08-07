import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p className="text-center mt-10">You are not logged in.</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-purple-600 text-center">Your Profile</h2>
      <p className="mb-2"><strong>Username:</strong> {user.username}</p>
      <p className="mb-2"><strong>Email:</strong> {user.email}</p>
      <p className="mb-2"><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default Profile;
