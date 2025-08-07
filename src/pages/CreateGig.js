import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buttonClass } from "../utils/buttonStyles";

const CreateGig = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !description || !price || !image) {
      setError("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        '${https://freelance-backend-3.onrender.com/api/gigs',
        formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/freelancer-dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message || "Gig creation failed. Try again.";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4 sm:px-8">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
          Create a New Gig
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter gig title"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter gig description"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full"
            />
          </div>

          {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}

          <button type="submit" className={`${buttonClass} w-full`}>
            Submit Gig
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGig;
