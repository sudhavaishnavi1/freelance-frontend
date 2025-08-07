
const pics = [
  "/images/freelance1.jpg",
  "/images/freelance2.jpg",
  "/images/freelance3.jpg",
  "/images/freelance4.jpg"
];

const RemoteGallery = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 py-8">
    {pics.map((src, idx) => (
      <img
        key={idx}
        src={src}
        alt="Freelance work"
        className="w-full h-48 object-cover rounded-lg shadow-md"
      />
    ))}
  </div>
);

export default RemoteGallery;
