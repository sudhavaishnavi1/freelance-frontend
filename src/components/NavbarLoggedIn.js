import { Link, useNavigate } from "react-router-dom";

const NavbarLoggedIn = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white text-black shadow-md px-4 py-4 sticky top-0 z-50">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <Link to="/" className="text-2xl font-bold text-purple-700">
          FreelanceHub
        </Link>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <Link to="/profile">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
              Profile
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLoggedIn;
