import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import RemoteGallery from "../components/RemoteGallery";

const Homepage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="w-full min-h-screen font-sans bg-black text-white relative px-4 sm:px-8">

      {/* 🔝 Black Navbar for Homepage only */}
      <header className="fixed top-0 left-0 w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-6 py-4 z-50 bg-black/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="h-8 w-8 rounded-full" />
          <h1 className="text-2xl font-extrabold tracking-wide">
            freelance<span className="text-purple-400">Hub</span>
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <Link to="/login" className="bg-white text-purple-700 font-semibold py-2 px-4 rounded-full hover:bg-gray-200 transition">
            Login
          </Link>
          <Link to="/register" className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition">
            Register
          </Link>
        </div>
      </header>

      {/* 🎯 Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center pt-24 bg-gradient-to-b from-black via-gray-900 to-black" data-aos="fade-down">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Connect. Collaborate. Create.</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-300">Discover skilled freelancers and bring your project ideas to life.</p>
        <Link to="/gigs" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full transition">Browse Gigs</Link>
        <div className="animate-bounce mt-10"><span className="text-3xl text-gray-400">↓</span></div>
      </section>

      {/* 🖼️ Freelance Image Gallery */}
      <section className="bg-white text-black py-16 px-4 sm:px-8" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Explore by Category</h2>
        <RemoteGallery />
      </section>

      {/* 💬 Testimonials */}
      <section className="bg-white text-black py-16 px-4 sm:px-8" data-aos="fade-right">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <p className="italic mb-4">"FreelanceHub made it so easy to find a designer for my brand."</p>
            <h4 className="font-semibold text-lg">— Priya R.</h4>
            <p className="text-sm text-gray-600">Startup Founder</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <p className="italic mb-4">"I get clients regularly through this platform."</p>
            <h4 className="font-semibold text-lg">— Rohit M.</h4>
            <p className="text-sm text-gray-600">Full-Stack Developer</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <p className="italic mb-4">"The clean UI and smooth payment integration made me trust this platform."</p>
            <h4 className="font-semibold text-lg">— Aishwarya K.</h4>
            <p className="text-sm text-gray-600">Digital Marketer</p>
          </div>
        </div>
      </section>

      {/* 🦶 Footer */}
      <footer className="bg-black text-gray-400 py-10 text-center border-t border-gray-700 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-white text-xl font-semibold mb-4">freelance<span className="text-purple-400">Hub</span></h3>
          <p className="text-sm mb-4">&copy; {new Date().getFullYear()} FreelanceHub. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-sm">
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
          </div>
          <div className="mt-6 flex justify-center space-x-6 text-white">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400"><i className="fab fa-instagram text-xl"></i></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400"><i className="fab fa-linkedin text-xl"></i></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400"><i className="fab fa-github text-xl"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
