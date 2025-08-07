import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white shadow-md px-4 py-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <Link to="/" className="text-2xl font-bold text-purple-400">
          FreelanceHub
        </Link>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          {token ? (
            <>
              <Link to="/profile">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md w-full sm:w-auto hover:bg-purple-700">
                  Profile
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md w-full sm:w-auto hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-white text-purple-700 border border-purple-700 px-4 py-2 rounded-md w-full sm:w-auto hover:bg-purple-100">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md w-full sm:w-auto hover:bg-purple-700">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
