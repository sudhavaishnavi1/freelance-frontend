import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-24 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
        Discover Top Freelancers for Any Job
      </h1>
      <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
        Hire the best talent and get your project done with speed and quality. Find freelancers in design, development, writing, and more!
      </p>
      <Link
        to="/gigs"
        className="bg-white text-purple-700 font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition"
      >
        Browse Gigs
      </Link>
    </div>
  );
};

export default Hero;
