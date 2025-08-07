import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

// Layout that wraps all pages except homepage
import Layout from "./components/Layout";

// Pages
import AdminDashboard from "./pages/AdminDashboard";
import Cancel from "./pages/Cancel";
import ClientDashboard from "./pages/ClientDashboard";
import CreateGig from "./pages/CreateGig";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import FreelancerOrders from "./pages/FreelancerOrders";
import GigDetail from "./pages/GigDetail";
import Gigs from "./pages/Gigs";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import MyGigs from "./pages/MyGigs";
import MyOrders from "./pages/MyOrders";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ReviewedGigs from "./pages/ReviewedGigs";
import Success from "./pages/Success";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Public Homepage - Only Black Navbar */}
      <Route path="/" element={<Homepage />} />

      {/* All Other Pages - White Navbar in Layout */}
      <Route element={<Layout />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/gig/:id" element={<GigDetail />} />
        <Route path="/create-gig" element={<CreateGig />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-gigs" element={<MyGigs />} />
        <Route path="/reviewed-gigs" element={<ReviewedGigs />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/freelancer-orders" element={<FreelancerOrders />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Route>
    </Routes>
  );
}

export default App;
